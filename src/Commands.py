from src.Exceptions import *
from abc import ABC
import os
import sys
import subprocess
import argparse
import re


class CommandResult:
    """
    описывает результат работы каждой команды
    хранит в себе выходной поток
    """
    def __init__(self, output_stream=""):
        self.output_stream = output_stream

    def __eq__(self, other):
        return self.output_stream == other.output_stream


class Command(ABC):
    def __init__(self, args):
        self.args = args

    def run(self, input_stream, env):
        pass


class External(Command):
    """
    внешняя команды
    например, git status
    """
    def run(self, input_stream, env):
        process_result = None
        try:

            process_result = subprocess.run(self.args, input=input_stream,
                                            stdout=subprocess.PIPE,
                                            encoding=sys.stdout.encoding)
        except FileNotFoundError:
            raise CommandExternalException("external command not found")
        return CommandResult(process_result.stdout)


class Assignment(Command):
    """
    команда присваивания
    например, x=5
    """
    def run(self, input_stream, env):
        env.add_var(self.args[0], self.args[1])
        return CommandResult()


class Echo(Command):
    """
    команда echo вывода в поток
    например, echo 5
    """
    def run(self, input_stream, env):
        return CommandResult(
            " ".join(self.args) if len(self.args) != 0 else " ")


class Cat(Command):
    """
    команда cat чтения файла и вывода в поток
    например, cat "example.txt"
    """
    def run(self, input_stream, env):
        if len(self.args) == 0:
            return CommandResult(input_stream)
        else:
            if os.path.isfile(self.args[0]) and \
                    os.access(self.args[0], os.R_OK):
                with open(self.args[0], "r") as file:
                    return CommandResult(file.read())
            else:
                raise CommandFileException(
                    "CAT error (bad permission, not exists)")


class Wc(Command):
    """
    команда wc - отображает число строк, слов, байт в файле
    например, wc "example.txt"
    """
    def __wc(self, input_stream):
        line_count = words_count = bytes_count = 0
        for line in input_stream.split('\n'):
            words_count += len(line.split())
            bytes_count += len(line.encode('utf8'))
            line_count += 1
        return "\t {:d} \t {:d} \t {:d}".format(line_count, words_count,
                                                bytes_count)

    def run(self, input_stream, env):
        if len(self.args) == 0:
            return CommandResult(self.__wc(input_stream))
        else:
            if os.path.isfile(self.args[0]) and \
                    os.access(self.args[0], os.R_OK):
                with open(self.args[0], "r") as file:
                    return CommandResult(self.__wc(file.read()))
            else:
                raise CommandFileException(
                    "WC error (bad permission, not exists)")


class Pwd(Command):
    """
    команда pwd отображает текущую рабочую директорию
    например, pwd
    """
    def run(self, input_stream, env):
        return CommandResult(env.get_cur_dir())


class Exit(Command):
    """
    команда exit выхода из консоли
    например, exit
    """
    def run(self, input_stream, env):
        sys.exit()


class Grep(Command):
    """
    команда grep ищет строки, содержащие заданный пользователем образец
    синтаксис: grep ОБРАЗЕЦ [имя_файла] [-i] [-w] [-A n]
    например, grep "[1-9]" "example.txt" -i
    флаги:
        -i игнорирует регистр символов
        -w ищет только строки, содержащие все слово или фразу из образца
        -A n распечатает n строк после строки, совпадающей с образоцом
    """
    def __grep(self, text, args):
        pattern = args.pattern
        delim = "\n"
        n = 0

        flags = 0
        if args.i:
            flags = re.IGNORECASE
        if args.w:
            pattern = '\\b{}\\b'.format(pattern)
        if args.A > 0:
            delim = "\n--\n"
            n = args.A

        output = ""
        is_first = True
        lines = text.split('\n')
        for i in range(len(lines)):
            res = re.search(pattern, lines[i], flags)
            if res is None:
                continue
            after = "\n".join(lines[(i + 1):][:n])
            if after is not "":
                after = "\n" + after
            if not is_first:
                output += delim + lines[i] + after
            else:
                output += lines[i] + after
                is_first = False
        return output

    def run(self, input_stream, env):
        # переопределение исключения при ошибке
        class Parser(argparse.ArgumentParser):
            def error(self, message):
                raise CommandArgumentException(
                    "GREP\nusage: grep [-h] [-i] [-w] [-A n] pattern [file]")

        grep_parser = Parser(description="grep")
        grep_parser.add_argument("pattern")
        grep_parser.add_argument("file", nargs='?', default="")
        grep_parser.add_argument('-i', action='store_true')
        grep_parser.add_argument('-w', action='store_true')
        grep_parser.add_argument("-A", type=int, default=0)

        args = grep_parser.parse_args(self.args)
        if args.file == "":
            return CommandResult(self.__grep(input_stream, args))
        else:
            if os.path.isfile(args.file) and \
                    os.access(args.file, os.R_OK):
                with open(args.file, "r") as file:
                    return CommandResult(self.__grep(file.read(), args))
            else:
                raise CommandFileException(
                    "GREP error (bad permission, not exists)")

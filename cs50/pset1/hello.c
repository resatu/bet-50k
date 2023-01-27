// if/else
// Path: cs50/pset1/hello.c
#include <stdio.h>
#include <cs50.h>
#include <string.h>

int main(void)
{
    string answer = get_string("What's your name? ");
    if (strcmp(answer, "Alice") == 0)
    {
        printf("hello, Alice\n");
    }
    else if (strcmp(answer, "Bob") == 0)
    {
        printf("hello, Bob\n");
    }
    else
    {
        printf("hello, stranger\n");
    }
}

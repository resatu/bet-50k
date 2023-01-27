#include <cs50.h>
#include <stdio.h>

int main(void)
{
    const int MINE = 2;

    int points = get_int("how many points did you lose? ");

    if (points < 2)
    {
        printf("You lost fewer points than me. \n");
    }
    else if (points > 2)
    {
        printf("You lost more points than me. \n");
    }
    else
    {
        printf("We've seem to be lost about same points... \n");
    }
}
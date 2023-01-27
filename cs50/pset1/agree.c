#include <cs50.h>
#include <stdio.h>

int main(void)
{
    // get user input
    char c = get_char("Do you agree? ");
    // check whether user agreed
    if (c == 'y' || c == 'Y')
    {
        // print if user agreed
        printf("Agreed.\n");
    }
    // check whether user not agreed
    else if (c == 'n' || c == 'N')
    {
        // print if user not agreed
        printf("Not agreed...\n");
    }
}
// #include <cs50.h>
// #include <stdio.h>

// int main(void)
// {
//     int i = 0;
//     while (i < 3)
//     {
//         printf("meow\n");
//         i++;
//     }
// }

// do the same with for loop
#include <cs50.h>
#include <stdio.h>

void meow(void)
{
    printf("meow\n");
}

int main(void)
{
    for (int i = 0; i < 3; i++)
    {
        meow();
    }
}

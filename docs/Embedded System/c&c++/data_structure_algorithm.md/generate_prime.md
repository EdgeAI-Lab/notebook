# 生成质数

 *  质数：只能被1和自己整除，eg: 1 2 3 5 7 11
 *  质数：排除1的影响，只能被自己整除

```c
#include <stdio.h>

void generate_prime(int value)
{
	int i,j=0;

	printf("1\n");

	for(i=2;i<=value;i++)
	{
		for(j=2;j<=i;j++)
		{
			if(i%j==0)
			{
				/*  1.排除1的影响后，质数只能被自己整除（i%j只能有一次为0）；
				 *  2.所以一旦出现被整除的情况（i%j==0），就终止后续的整除判断（终止循环），
				 *    并判断此时除数（i）与被除数（j）是否相等，若相等则表明是被自身整除，
				 *    既i是质数。
				 * 
				 */
				break;
			}
		}

		if(j==i)  
		{
			printf("%d\n",i);
		}

	}
}


int main()
{

	generate_prime(23);

	return 0;
}
```
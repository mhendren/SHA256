
<H2>SHA-256</H2>

This is an independent implementation of the SHA-256 (SHA-2) Standard. It is independent of everything, including
Specialty libraries, Local libraries, and Common Sense. This is not intended as practical code, this is demonstration
only.

For example: The constants used by SHA-256 are well known, and established values. These are trivially looked up.
Instead, I have decided to calculate them. Then they are made up of the fractional part of the square/cube roots
of the first n primes. Clearly, I could not use the Math library's square root function to do the calculation. So
I had to write my own square root function (and prime number generator to boot).

This has been written in a functional syntax. Currying has been used even where it makes things less readable.
Overall, the readability has been pretty good.

I use the computer in the most abstract sense because I split everything out into arrays of 1's and 0's (literally).
So I cannot even use basic integer handling routines in the calculation.

<H3>How Do I Use This</H3>

Are you insane? Why would you use this? There are perfectly valid practical libraries for JavaScript that do this

<H3>How is this licensed</H3>

I don't care. Public Domain seems fine to me, unless this is prohibited by github, in which case whatever the most
nonrestrictive one you can find, that's it.

<H3>Why did you do this</H3>

Fun.
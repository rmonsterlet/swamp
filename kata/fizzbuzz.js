function factorial(number) {
    if(number % 15 === 0) return 'fizzbuzz';
    else if(number % 5 === 0) return 'buzz';
    else if(number % 3 === 0) return 'fizz';
    else return number;
}

function main() {

    // Cut 0=node and 1=index.js paths
    const args = process.argv.splice(2);
    if(!args.length) return;

    const n = +args[0];
    for(let i=0; i < n; i++) {
        console.log(factorial(i + 1));
    }
}

main();
function factorial(number) {

    if (number <= 0) return 1;
    else return number * factorial(number - 1);
}

function main() {

    // Cut 0=node and 1=index.js paths
    const args = process.argv.splice(2);
    if(!args.length) return;

    const n = +args[0];
    for(let i=0; i < n; i++) {
        console.log(factorial(i));
    }
}

main();
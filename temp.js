console.log('A');
console.log('B');
async function fun2() {
    await new Promise((resolve) => {
      setTimeout(() => {
        console.log('C');
        resolve();
      }, 1000);
    });

    return new Promise((resolve) => {
        setTimeout(() => {
          console.log('D');
          resolve();
        }, 0);
      });
     }
fun2()
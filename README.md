# ThreadThrottleJS

ThreadThrottleJS is functionality will queue all of your functions that will be processed and then throttle your predetermined number of simultaneous function calls to be executed from the queue.

The purpose behind this functionality is to overcome server slowness and/or network slowness which can cause AJAX calls to time out if there are too many processes hitting the server at one time or if the network is slow.

DEFINITIONS:
--------- 
`initThreadThrottleJS()` - Initiate and instantiate the threadThrottle object.  The available object name is ttjs.

`setFunctionName(YourFunction)` - Set the name of your function. Please note that there are no quotes around your function name.

`setLimit(n)` - Set the throttle limit to a number (n) of simultaneous threads to be executed at a time.

`setQueue(n)` - Set the Queue to a number (n) of functions to be executed.

`setData(a)` - Set the data of any (a) type you choose for each queue iteration while executing.

`start()` - Start the execution process! This only needs to be fired once to begin the entire process.

`complete()` - At the bottom, within "Yourfunction", tell threadThrottle that the process has completed in order to move the process to the next item in the queue.

#Example
A function has been executed 10 times and the set throttle limit is 2.  
Therefore, only 2 out of the 10 functions queued to run can execute at a time.  
The other 8 remain in a queue.  
As one function finishes executing, the next function in the queue takes its place and gets executed.  
The number of simultaneous executions remain at 2 at a time until all 10 functions have been executed.

Simply initiate the following code to start the process:

ttjs = initThreadThrottleJS();

ttjs.setFunctionName(YourFunction);

ttjs.setLimit(2);

ttjs.setQueue(5);

ttjs.setData({counter:1});

ttjs.setData({counter:2});

ttjs.setData({counter:3});

ttjs.setData({counter:4});

ttjs.setData({counter:5});

ttjs.start();

function YourFunction(data) {
    
    // This Example that would be replaced with your code, except leave ttjs.complete() in tact.
    console.log('Function #' + data.counter);
    
    ttjs.complete();

    return true;
}
#Demonstrations
Demo 1: http://plnkr.co/edit/hBrLJzVmCT7Mi45aIMl1?p=preview

Demo 2: http://plnkr.co/edit/p3vUlC?p=preview

#Keywords
Javascript Thread Throttle JS asynchronous async 

=========
By Ryan Hinton
© Copyright 2016 

# Thread Throttle JS
Queues up multiple executions of a function and throttles a set amount of simultaneous executions.  
=========
Demo 1: http://plnkr.co/edit/hBrLJzVmCT7Mi45aIMl1?p=preview
Demo 2: http://plnkr.co/edit/p3vUlC?p=preview

For example: A function has been executed 10 times and the set throttle limit is 2.  
Therefore, only 2 out of the 10 functions queued to run can execute at a time.  
The other 8 remain in a queue.  
As one function finishes executing, the next function in the queue takes its place and gets executed.  
The number of simultaneous executions remain at 2 at a time until all 10 functions have been executed.

Simply initiate the following code to start the process:

threadThrottle = threadThrottle.threadThrottle(thread);
threadThrottle.setFunctionName(simulatedSuccessResponse);
threadThrottle.setLimit(2);
threadThrottle.setQueue(5);
threadThrottle.start();

function YourFunction() {
    ...
    Your Code
    ...
    
    threadThrottle.complete();

    return ...
}

DEFINITIONS:
--------- 
initThreadThrottleJS(); - Initiate and instantiate the threadThrottle object.  The available object name is ttjs.

ttjs.setFunctionName(YourFunction) - Set the name of your function. Please note that there are no quotes around your function name.

ttjs.setLimit(n) - Set the throttle limit to a number (n) of simultaneous threads to be executed at a time.

ttjs.setQueue(n) - Set the Queue to a number (n) of functions to be executed.

ttjs.setData(o) - Set the data for each queue iteration while executing.

ttjs.start() - Start the execution process! This only needs to be fired once to begin the entire process.

ttjs.complete() - At the bottom, within "Yourfunction", tell threadThrottle that the process has completed in order to move the process to the next item in the queue.

##############
By Ryan Hinton
© Copyright 2016 

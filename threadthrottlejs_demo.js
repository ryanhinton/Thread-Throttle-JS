$(init_throttleTest);

function init_throttleTest() {
    // Event Handlers
    $('#runThrottleTest').on('click', runTest);
    $('#resetThreadThrottle').on('click', resetThreadThrottle);

    // Instantiate Objects
    output          = new output();
    threadThrottle  = new threadThrottle(thread);

    // Init/Set Object settings
    output.setElement(document.getElementById('output'));
}

function threadThrottle(callback) {
    var processesActive = 0,
        processesLimit = 0,
        processesCompleted = 0,
        queueTotal = 0,
        initialQueueTotal = 0,
        functionName = '';
    
    this.reset = function() {
        processesCompleted = 0;
        initialQueueTotal = 0;
    }

    this.start = function() {
        // Reset to initialized state.
        if (this.getCompleted() === initialQueueTotal) {
            output.clear();
        }

        var totalThreads = this.getQueue() + this.getActive() + this.getCompleted();
        var newThreadsAdded = totalThreads - initialQueueTotal;
        initialQueueTotal = initialQueueTotal > 0 ? totalThreads : this.getQueue();

        output.add('Added ' + newThreadsAdded + ' threads to the Queue! Total Added: ' + initialQueueTotal);
        // Run as many as the set limit allows.
        var limit = this.getLimit() > 0 ? this.getLimit() : initialQueueTotal;
        for (var i = 1; i <= limit; i++) {
            if (this.getQueue() > 0) {
                this.next(1);
            }
        }
    }

    this.next = function(i) {
        var response = false;
        output.add('Queue: ' + this.getQueue() + ', Active: ' + this.getActive() + ', Completed: ' + this.getCompleted());
        if (this.getCompleted() >= initialQueueTotal) {
            output.add('All ' + this.getCompleted() + ' threads have completed successfully!');
        } else if (this.getQueue() === 0) {
            output.add('The Queue is empty. Active: ' + this.getActive() + ', Completed: ' + this.getCompleted());
        } else if (this.getActive() < this.getLimit()) {
            this.setActive(i);
            output.add(i + ' process set. Total processing = ' + this.getActive());
            output.add('Queue: ' + this.getQueue() + ', Active: ' + this.getActive() + ', Completed: ' + this.getCompleted());
            if (i > 0) {
                callback(this);
            }
        } else {
            output.add('Hit limit of ' + this.getLimit() + '. Process count = ' + this.getActive() + '.');
        }
    }

    this.complete = function(i = 1) {
        this.setCompleted(i);
        output.add('Completed ' + i + ' process(es). Processes completed = ' + this.getCompleted() + '. ' + this.getQueue() + ' of ' + initialQueueTotal + ' remaining in the Queue. Executing next process.');
        this.next(1);
    }

    this.setQueue = function(i = 0) {
        queueTotal += i;
    }
    this.getQueue = function() {
        return queueTotal;
    }
    this.setActive = function(i) {
        processesActive += i;
        if (i > 0) {
            this.setQueue(i * -1);
        }
    }
    this.getActive = function() {
        return processesActive;
    }
    this.setCompleted = function(i) {
        processesCompleted += i;
        if (i > 0) {
            this.setActive(i * -1);
        }
    }
    this.getCompleted = function() {
        return processesCompleted;
    }
    this.setLimit = function(i) {
        processesLimit = i;
    }
    this.getLimit = function() {
        return processesLimit;
    }
    this.setFunctionName = function(s) {
        functionName = s;
    }
    this.getFunctionName = function() {
        return functionName;
    }
}

function output(message) {
    var consoleStatus = true,
        screenStatus = true,
        outputElement = this;

    this.clear = function() {
        this.clearScreen();
        this.clearConsole();
    }
    this.clearScreen = function() {
        this.getElement().innerHTML = '';
    }
    this.clearConsole = function() {
        console.clear();
    }
    this.setConsoleOnStatus = function(status) {
        consoleStatus = status;
    }
    this.getConsoleOnStatus = function() {
        return consoleStatus;
    }
    this.setScreenOnStatus = function(status) {
        screenStatus = status;
    }
    this.getScreenOnStatus = function() {
        return screenStatus;
    }
    this.setElement = function(element) {
        outputElement = element;
    }
    this.getElement = function() {
        return outputElement;
    }
    this.add = function(message) {
        if (this.getConsoleOnStatus()) {
            console.log(message);
        }
        if (this.getScreenOnStatus()) {
            this.getElement().innerHTML += message + '<br><br>';
        }
    }
}

function simulatedSuccessResponse() {
    // Once your function has completed, tell threadThrottle that the process has completed.
    threadThrottle.complete();

    return true;
}

function thread(thisRow) {
    output.add('Executing Simulated Thread');
    setTimeout(threadThrottle.getFunctionName(), 2000);
}

function runTest() {
    threadThrottle.setFunctionName(simulatedSuccessResponse);
    threadThrottle.setLimit(2);
    threadThrottle.setQueue(5);
    threadThrottle.start();
}

function resetThreadThrottle() {
    threadThrottle.reset();
    output.setScreenStatus(false);
    output.add('Thread Throttle has been reset');
    output.setScreenStatus(true);
}

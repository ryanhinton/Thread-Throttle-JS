/* ThreadThrottleJS v1.00 | (c) 2016 Hinton & Company | https://github.com/Drumsticks/ThreadThrottleJS/blob/master/LICENSE */
function init_ThreadThrottleJS() {
    // Instantiate Objects
    ttjs  = new ThreadThrottleJS(thread);
}

function ThreadThrottleJS(callback) {
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

        var totalThreads = this.getQueue() + this.getActive() + this.getCompleted();
        var newThreadsAdded = totalThreads - initialQueueTotal;
        initialQueueTotal = initialQueueTotal > 0 ? totalThreads : this.getQueue();

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
        
        if (this.getCompleted() >= initialQueueTotal) {
        } else if (this.getQueue() === 0) {
        } else if (this.getActive() < this.getLimit()) {
            this.setActive(i);
            if (i > 0) {
                callback(this);
            }
        }
    }

    this.complete = function(i = 1) {
        this.setCompleted(i);
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

function thread(thisRow) {
    ttjs.getFunctionName()();
}

var Status = {

    init: function() {

        Status.ammoSpan = $('ammo');
        Status.targetSpan = $('targetsLeft');

        Status.setStatus();

    },

    setStatus: function() {

        var ammoStr = 'Ammo: ' + Level.ammoLeft + '/' + Level.ammoCount;
        Status.ammoSpan.innerHTML = ammoStr;

        var targetStr = 'Targets Left: ' + Level.targetCount;
        Status.targetSpan.innerHTML = targetStr;
    
    }

};
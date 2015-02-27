/**
 * Created by mhendren on 2/27/2015.
 */
var map = require('./map');
function Message(message) {
    function zeroPad(n, w) {
        return n.length >= w ? n : new Array(w - n.length + 1).join('0') + n;
    }

    function toBinary() {
        function iter(msg, out) {
            function toBitArray(charCode) {
                return map(zeroPad(charCode.toString(2), "00000000".length).split(''), function (x) {
                    return x == "1" ? 1 : 0;
                });
            }

            return msg.length == 0 ? out : iter(msg.slice(1), out.concat(toBitArray(msg.charCodeAt(0))));
        }

        return iter(message, []);
    }

    function pad(msg) {
        function padZero(m) {
            return m.length % 512 == 448 ? m : padZero(m.concat(0));
        }

        return padZero(msg.concat(1));
    }

    function appendLength(msg, len) {
        function toBitArray(len) {
            return map(zeroPad(len.toString(2),
                    "0000000000000000000000000000000000000000000000000000000000000000".length).split(''),
                function (x) {
                    return x == "1" ? 1 : 0;
                });
        }
        return msg.concat(toBitArray(len));
    }

    return {
        add: function(msg) { return new Message(message.concat(msg)); },
        get: function() { return message; },
        toBinary: function() {
            var binMessage = toBinary();
            return appendLength(pad(binMessage), binMessage.length);
        }
    };
}
module.exports = Message;
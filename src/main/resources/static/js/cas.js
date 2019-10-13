/**
 * Shim for String.prototype.startsWith
 * https://github.com/mathiasbynens/String.prototype.startsWith
 */
if (!String.prototype.startsWith) {
    (function() {
        'use strict'; // needed to support `apply`/`call` with `undefined`/`null`
        var defineProperty = (function() {
            // IE 8 only supports `Object.defineProperty` on DOM elements
            try {
                var object = {};
                var $defineProperty = Object.defineProperty;
                var result = $defineProperty(object, object, object) && $defineProperty;
            } catch(error) {}
            return result;
        }());
        var toString = {}.toString;
        var startsWith = function(search) {
            if (this == null) {
                throw TypeError();
            }
            var string = String(this);
            if (search && toString.call(search) == '[object RegExp]') {
                throw TypeError();
            }
            var stringLength = string.length;
            var searchString = String(search);
            var searchLength = searchString.length;
            var position = arguments.length > 1 ? arguments[1] : undefined;
            // `ToInteger`
            var pos = position ? Number(position) : 0;
            if (pos != pos) { // better `isNaN`
                pos = 0;
            }
            var start = Math.min(Math.max(pos, 0), stringLength);
            // Avoid the `indexOf` call if no match is possible
            if (searchLength + start > stringLength) {
                return false;
            }
            var index = -1;
            while (++index < searchLength) {
                if (string.charCodeAt(start + index) != searchString.charCodeAt(index)) {
                    return false;
                }
            }
            return true;
        };
        if (defineProperty) {
            defineProperty(String.prototype, 'startsWith', {
                'value': startsWith,
                'configurable': true,
                'writable': true
            });
        } else {
            String.prototype.startsWith = startsWith;
        }
    }());
}

(function() {
    /**
     * Utility for Cookies
     * @namespace cookies
     * @author Nisarg Jhaveri <nisarg.jhaveri@students.iiit.ac.in>
     *
     * Originally written for Felicity '15 website
     */
    var cookies = {
        /**
         * Add or update cookie
         *
         * @memberof cookies
         *
         * @param {string} name - Name of the cookie
         * @param {string} value - Value to be set
         * @param {number} expiry - Expiry of cookie in hours (i.e expire after this many hours)
         * @param {string} [path] - Path for the cookie
         */
        set: function( name, value, expiry, path ) {
            var ex = new Date();
            ex.setTime( ex.getTime() + ( expiry * 60 * 60 * 1000 ) );
            var expires = "expires=" + ex.toUTCString();
            document.cookie = name + "=" + value + "; " + expires + ( path ? '; path=' + path : '' );
        },
        /**
         * Get required cookie value
         *
         * @memberof cookies
         *
         * @param {string} name - Name of the cookie
         *
         * @returns {string} Value of the cookie
         */
        get: function( name ) {
            name = name + '=';
            var cookieList = document.cookie.split( ';' );
            var cookie;
            for ( cookie in cookieList ) {
                cookie = cookieList[cookie].trim();
                if ( cookie.substr( 0, name.length ) == name ) {
                    return cookie.substr( name.length );
                }
            }
        },
        /**
         * Remove a cookie
         *
         * @memberof cookies
         *
         * @param {string} name - Name of the cookie
         */
        remove: function ( name ) {
            document.cookie = name + "=; expires=Thu, 01 Jan 1970 00:00:00 UTC";
        }
    };

    var areCookiesDisabled = function () {
        cookies.set('testCookie', 'true', 1);
        var value = cookies.get('testCookie');
        if (value !== undefined) {
            cookies.remove('testCookie');
            return false;
        }
        return true;
    };

    var setupEmailAutocomplete = function () {
        var element = document.getElementById('username');
        var emailDomains = [
            'iiit.ac.in',
            'students.iiit.ac.in',
            'research.iiit.ac.in',
            'alumni.outreach.iiit.ac.in',
            'ecell.iiit.ac.in',
        ];
        var oldValue = '';
        var autoCompleteDomainName = function(e) {
            var parts = element.value.split('@');
            var username = parts[0] || '';
            var newValue = parts[1] || '';
            if (newValue && newValue.length > oldValue.length) {
                var allowed = emailDomains.filter(function(domain) {
                    return domain.startsWith(newValue);
                });
                if (allowed.length == 1) {
                    var domain = allowed[0];
                    var partToAdd = domain.replace(newValue, '');
                    element.value = username + '@' + domain;
                    element.focus();
                    setTimeout(function() {
                        element.setSelectionRange(
                            element.value.length - partToAdd.length,
                            element.value.length
                        );
                    }, 0);
                }
            }
            oldValue = newValue;
        };
        var setOldValue = function () {
            oldValue = element.value.split('@')[1] || '';
        };
        element.addEventListener('input', autoCompleteDomainName);
        element.addEventListener('change', setOldValue);
        element.addEventListener('focus', setOldValue);
        element.addEventListener('click', setOldValue);
        element.focus();
    };

    var setupCheckForCapslock = function () {
        var capslockOnMessage = document.getElementById('capslock-on');
        document
            .getElementById('password')
            .addEventListener('keypress', function(e) {
                var s = String.fromCharCode( e.which );
                if ( s.toUpperCase() === s && s.toLowerCase() !== s && !e.shiftKey ) {
                    capslockOnMessage.style.display = 'inline';
                } else {
                    capslockOnMessage.style.display = 'none';
                }
            });
    };

    var onLoad = function() {
        if (areCookiesDisabled()) {
            document.getElementById('cookiesDisabled').style.display = 'block';
        }
        setupEmailAutocomplete();
        setupCheckForCapslock();
    };

    window.addEventListener('load', onLoad);
})();








/* exported resourceLoadedSuccessfully */

function requestGeoPosition() {
    // console.log('Requesting GeoLocation data from the browser...');
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showGeoPosition, logGeoLocationError,
            {maximumAge: 600000, timeout: 5000, enableHighAccuracy: true});
    } else {
        // console.log('Browser does not support Geo Location');
    }
}

function logGeoLocationError(error) {
    switch (error.code) {
    case error.PERMISSION_DENIED:
        // console.log('User denied the request for GeoLocation.');
        break;
    case error.POSITION_UNAVAILABLE:
        // console.log('Location information is unavailable.');
        break;
    case error.TIMEOUT:
        // console.log('The request to get user location timed out.');
        break;
    default:
        // console.log('An unknown error occurred.');
        break;
    }
}

function showGeoPosition(position) {
    $('[name="geolocation"]').val(position.coords.latitude + ','
        + position.coords.longitude + ',' + position.coords.accuracy + ',' + position.timestamp);
}


function preserveAnchorTagOnForm() {
    $('#fm1').submit(function () {
        var location = self.document.location;
        var hash = decodeURIComponent(location.hash);
        
        if (hash != undefined && hash != '' && hash.indexOf('#') === -1) {
            hash = '#' + hash;
        }

        var action = $('#fm1').attr('action');
        if (action == undefined) {
            action = location.href;
        } else {
            var qidx = location.href.indexOf('?');
            if (qidx != -1) {
                var queryParams = location.href.substring(qidx);
                action += queryParams;
            }
        }
        action += hash;
        $('#fm1').attr('action', action);
        
    });
}

function preventFormResubmission() {
    $('form').submit(function () {
        $(':submit').attr('disabled', true);
        var altText = $(':submit').attr('data-processing-text');
        if (altText) {
            $(':submit').attr('value', altText);
        }
        return true;
    });
}

function areCookiesEnabled() {
    if ($.cookie == undefined) {
        return;
    }

    $.cookie('cookiesEnabled', 'true');
    var value = $.cookie('cookiesEnabled');
    $.removeCookie('cookiesEnabled');
    return value != undefined;

}

function resourceLoadedSuccessfully() {
    $(document).ready(function () {

        if (trackGeoLocation) {
            requestGeoPosition();
        }

        if ($(':focus').length === 0) {
            $('input:visible:enabled:first').focus();
        }

        if (areCookiesEnabled()) {
            $('#cookiesDisabled').hide();
        } else {
            $('#cookiesDisabled').show();
        }

        preserveAnchorTagOnForm();
        preventFormResubmission();

        $('#capslock-on').hide();
        $('#fm1 input[name="username"],[name="password"]').trigger('input');
        $('#fm1 input[name="username"]').focus();

        $('#password').keypress(function (e) {
            var s = String.fromCharCode(e.which);
            if (s.toUpperCase() === s && s.toLowerCase() !== s && !e.shiftKey) {
                $('#capslock-on').show();
            } else {
                $('#capslock-on').hide();
            }
        });
        if (typeof(jqueryReady) == 'function') {
            jqueryReady();
        }
    });

}

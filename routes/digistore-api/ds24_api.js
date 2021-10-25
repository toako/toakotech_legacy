
/**
 * Digistore24 REST Api Connector
 * @author Christian Neise
 * @link https://doc.digistore24.com/api-en/
 *
 * A js function providing a connection to the Digistore24 REST api server.
 *
 * This connector is compatible with future version of the Digistore24 api.
 * Even if the Digistore24 api is extended, you still can use this connector.
 *
 * © 2021 Digistore24 Inc., all rights reserved
 */

/*

Copyright (c) 2021 

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and
associated documentation files (the "Software"), to deal in the Software without restriction,
including without limitation the rights to use, copy, modify, merge, publish, distribute,
sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or
substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT
NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.
IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY,
WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE
SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
*/

/*
 * callback - a callback function like: function some_callback( data ) {}
 * apikey - your developer apikey. Do not use other api keys - they are easy to retrieve from the javascript code.
 * method - the name of the function to call
 * first_arg_or_empty - a list the args of method (if any) as further function arguments. You may add further arguments - depending on the called api function, e.g.
 *                      ds24_api( callback, apikey, 'listPurchases', '-24h', 'now', [], 'date', 'asc' )
 */
function ds24_api( callback, apikey, method, first_arg_or_empty )
{
    var fixed_param_count = 3;
    var api_arg_counter_start = 1;

    var api_url = 'https://www.digistore24.com/api/call/' + method + '/?';

    var i        = api_arg_counter_start;
    var offset   = fixed_param_count-api_arg_counter_start;
    var finished = false;

    while (i+offset < arguments.length)
    {
        var value = arguments[i+offset];
        var type = typeof value;
        switch (type)
        {
            case 'object':
                var is_array = value instanceof Array;
                if (!is_array) {
                    throw "The Digistore24 Api Javascript connector does not accept objects (except arrays) as arguments.";
                }

                for (key in value)
                {
                    api_url += 'arg'+i+'['+encodeURIComponent(key)+']='+encodeURIComponent(value[key]) + '&';
                }
                break;

            case 'undefined':
            case null:
                api_url += 'arg'+i+'='+ '&';
                break;

            default:
                api_url += 'arg'+i+'='+encodeURIComponent(value) + '&';
        }
        i++;
    }

    var callback_wrapper = function () {
            if (http.readyState==4) {
                if (http.status==200) {
                    var response = JSON.parse( http.responseText );

                    if (response.result=='success')
                    {
                        callback( response.data );
                    }
                    else
                    {
                        throw response.message;
                    }
                }
                else {
                    throw "Digistore24 api: invalid HTTP status " + http.statusText;
                }
            }
    };

    http = new XMLHttpRequest();
    http.setRequestHeader( 'X-DS-API-KEY', apikey );
    http.setRequestHeader( 'Accept', 'application/json' );
    http.open( 'GET', api_url, true );
    http.onreadystatechange = callback_wrapper;
    http.send();
}
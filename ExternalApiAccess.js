var httpReq = require('request');
var config = require('config');
var util = require('util');
var logger = require('DVP-Common/LogHandler/CommonLogHandler.js').logger;

var IncrementMaxChanLimit = function(reqId, campId, securityToken, callback)
{
    try
    {
        logger.debug('[DVP-EventMonitor.IncrementMaxChanLimit] - [%s] -  Creating Post Message', reqId);

        var dialerIp = config.Dialer.ip;
        var dialerPort = config.Dialer.port;

        if(dialerIp && dialerPort)
        {
            var httpUrl = util.format('http://%s:%d/DialerSelfHost/Campaign/IncrMaxChannelLimit', dialerIp, dialerPort);

            var jsonStr = campId;

            var options = {
                url: httpUrl,
                method: 'POST',
                headers: {
                    'authorization': securityToken,
                    'content-type': 'application/json'
                },
                body: jsonStr
            };

            logger.debug('[DVP-EventMonitor.IncrementMaxChanLimit] - [%s] - Creating Api Url : %s', reqId, httpUrl);


            httpReq.post(options, function (error, response, body)
            {
                if (!error && response.statusCode >= 200 && response.statusCode <= 299)
                {
                    logger.debug('[DVP-EventMonitor.IncrementMaxChanLimit] - [%s] - Increment Limit Success : %s', reqId, body);

                    callback(undefined, true);
                }
                else
                {
                    logger.error('[DVP-EventMonitor.IncrementMaxChanLimit] - [%s] - Increment Limit Fail', reqId, error);
                    callback(error, false);
                }
            })
        }
        else
        {
            logger.error('[DVP-EventMonitor.IncrementMaxChanLimit] - [%s] - Dialer Endpoints not defined', reqId, error);
            callback(new Error('Dialer Endpoints not defined'), false);
        }

    }
    catch(ex)
    {
        logger.error('[DVP-EventMonitor.IncrementMaxChanLimit] - [%s] - Exception occurred', reqId, ex);
        callback(ex, false);
    }
};

var DecrementMaxChanLimit = function(reqId, campId, securityToken, callback)
{
    try
    {
        logger.debug('[DVP-EventMonitor.DecrementMaxChanLimit] - [%s] -  Creating Post Message', reqId);

        var dialerIp = config.Dialer.ip;
        var dialerPort = config.Dialer.port;

        if(dialerIp && dialerPort)
        {
            var httpUrl = util.format('http://%s:%d/DialerSelfHost/Campaign/DecrMaxChannelLimit', dialerIp, dialerPort);

            var jsonStr = campId;

            var options = {
                url: httpUrl,
                method: 'POST',
                headers: {
                    'authorization': securityToken,
                    'content-type': 'application/json'
                },
                body: jsonStr
            };

            logger.debug('[DVP-EventMonitor.DecrementMaxChanLimit] - [%s] - Creating Api Url : %s', reqId, httpUrl);


            httpReq.post(options, function (error, response, body)
            {
                if (!error && response.statusCode >= 200 && response.statusCode <= 299)
                {
                    logger.debug('[DVP-EventMonitor.DecrementMaxChanLimit] - [%s] - Decrement Limit Success : %s', reqId, body);

                    callback(undefined, true);
                }
                else
                {
                    logger.error('[DVP-EventMonitor.DecrementMaxChanLimit] - [%s] - Decrement Limit Fail', reqId, error);
                    callback(error, false);
                }
            })
        }
        else
        {
            logger.error('[DVP-EventMonitor.DecrementMaxChanLimit] - [%s] - Dialer Endpoints not defined', reqId, error);
            callback(new Error('Dialer Endpoints not defined'), false);
        }

    }
    catch(ex)
    {
        logger.error('[DVP-EventMonitor.DecrementMaxChanLimit] - [%s] - Exception occurred', reqId, ex);
        callback(ex, false);
    }
};

var SetMaxChanLimit = function(reqId, campId, maxLimit, securityToken, callback)
{
    try
    {
        logger.debug('[DVP-EventMonitor.SetMaxChanLimit] - [%s] -  Creating Post Message', reqId);

        var dialerIp = config.Dialer.ip;
        var dialerPort = config.Dialer.port;

        if(dialerIp && dialerPort)
        {
            var httpUrl = util.format('http://%s:%d/DialerSelfHost/Campaign/SetMaxChannelLimit', dialerIp, dialerPort);

            var jsonStr = campId + '_' + maxLimit;

            var options = {
                url: httpUrl,
                method: 'POST',
                headers: {
                    'authorization': securityToken,
                    'content-type': 'application/json'
                },
                body: jsonStr
            };

            logger.debug('[DVP-EventMonitor.SetMaxChanLimit] - [%s] - Creating Api Url : %s', reqId, httpUrl);


            httpReq.post(options, function (error, response, body)
            {
                if (!error && response.statusCode >= 200 && response.statusCode <= 299)
                {
                    logger.debug('[DVP-EventMonitor.SetMaxChanLimit] - [%s] - Set Limit Success : %s', reqId, body);

                    callback(undefined, true);
                }
                else
                {
                    logger.error('[DVP-EventMonitor.SetMaxChanLimit] - [%s] - Set Limit Fail', reqId, error);
                    callback(error, false);
                }
            })
        }
        else
        {
            logger.error('[DVP-EventMonitor.SetMaxChanLimit] - [%s] - Dialer Endpoints not defined', reqId, error);
            callback(new Error('Dialer Endpoints not defined'), false);
        }

    }
    catch(ex)
    {
        logger.error('[DVP-EventMonitor.SetMaxChanLimit] - [%s] - Exception occurred', reqId, ex);
        callback(ex, false);
    }
};

var GetModCallCenterAgentCount = function(reqId, campId, callback)
{
    try
    {
        logger.debug('[DVP-EventMonitor.GetModCallCenterAgentCount] - [%s] -  Trying to get Mod Call Center Agent Count From Api', reqId);
        var fsIp = config.Freeswitch.ip;
        var fsPort = config.Freeswitch.httport;

        if(fsIp && fsPort)
        {

            var httpUrl = util.format('http://%s:%s/api/callcenter_config? queue count agents election@%s Available', fsIp, fsPort, campId);

            var options = {
                url: httpUrl
            };

            logger.debug('[DVP-EventMonitor.GetModCallCenterAgentCount] - [%s] - Creating Api Url : %s', reqId, httpUrl);


            httpReq(options, function (error, response, body)
            {
                if (!error && response.statusCode >= 200 && response.statusCode <= 299)
                {
                    logger.debug('[DVP-EventMonitor.GetModCallCenterAgentCount] - [%s] - FS Agent Count Success : %s', reqId, body);

                    callback(undefined, body);
                }
                else
                {
                    logger.error('[DVP-EventMonitor.GetModCallCenterAgentCount] - [%s] - FS Agent Count Failed', reqId, error);
                    callback(error, undefined);
                }
            })
        }
        else
        {
            logger.error('[DVP-EventMonitor.GetModCallCenterAgentCount] - [%s] - FS Mod Call Center service ip, port or version not set', reqId);
            callback(new Error('FS Mod Call Center service ip, port or version not set'), undefined)
        }
    }
    catch(ex)
    {
        logger.error('[DVP-EventMonitor.GetModCallCenterAgentCount] - [%s] - Exception occurred', reqId, ex);
        callback(ex, undefined);
    }
};

module.exports.IncrementMaxChanLimit = IncrementMaxChanLimit;
module.exports.DecrementMaxChanLimit = DecrementMaxChanLimit;
module.exports.GetModCallCenterAgentCount = GetModCallCenterAgentCount;
module.exports.SetMaxChanLimit = SetMaxChanLimit;
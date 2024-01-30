The purpose of this repository is to experiment with mechanisms to manage multiple inbound
domains with the same general content needs. In this scenario, my goal is to have a singular
on boarding to configure templates or themes around the uniform content. In an ideal state,
the individual domains could even provide origin string overrides for the static portions
of the site. When configured properly, the users of each domain have no visual indication
that the underlying application is shared, but the basic behavior is identical across all
domains and could be maintained and supported by a singular team.

### Prerequisites

This setup assumes you have a working knowledge and local installation of the following
technologies:

 * [Docker](https://docker.com)
 * [NGINX](https://nginx.com)
 * [Node.js](https://nodejs.org)

## Getting Started

**NOTE:** this documentation is currently written for MacOS and the bash scripts are not
tested on Windows devices.

Once you have cloned this repo into a local environment, the following steps will give you
the ability to test your own domain mappings.

### Step 1: configure your domains

In your `/etc/hosts` file, add any domains you want to use as test addresses for this app.
As an example, add the following section to your own file to resolve these domains:

```
# Start experiment section
127.0.0.1   local.google.com
127.0.0.1   local.amazon.com
127.0.0.1   local.microsoft.com
# End section
```

This will point any TCP traffic to those domains back into your local ports for resolution.

### Step 2: start the local service

The packaged configuration will listen for any domains pointed to your localhost and respond
by identifying that domain. There is a bash script to help with the initial docker setup:

```sh
# start nginx + express in docker
$ ./dev nginx
```

Once the application is running you should be able to browse to your domains.

### Step 3: test your domains

Open your web browser to your domain (using port 3080 by default). If you followed step 1
above, the following links should all resolve for you:

 * http://local.google.com:3080
 * http://local.amazon.com:3080
 * http://local.microsoft.com:3080

When you navigate to one of the above, you should see the same payload structure but with
the requested domain in the `original_domain` attribute.

**Example response:**
```
{
    "ok": true,
    "original_domain": "local.amazon.com"
}
```

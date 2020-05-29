# -*- coding: utf-8 -*-
from multiprocessing.pool import ThreadPool as Pool
import xmltodict
import requests
import dns.resolver
try:
    from urlparse import urlparse
except:
    from urllib.parse import urlparse
import socket
import backoff
import os


r = requests.get('http://c.speedtest.net/speedtest-servers-static.php')

d = xmltodict.parse(r.text)
ips = set()
dnsResolver = dns.resolver.Resolver()
dnsResolver.timeout = 1
dnsResolver.lifetime = 1
dnsResolver.nameservers = [os.environ.get('DNS_RESOLVER', '127.0.0.1')]

pool_size = 100
pool = Pool(pool_size)


def fatal_query(e):
    #return print(e)
    pass


@backoff.on_exception(backoff.expo, (dns.resolver.NXDOMAIN, dns.resolver.NoNameservers), max_tries=3, giveup=fatal_query)
def get_ipaddrs(domain):
    dns_result = dnsResolver.query(domain, 'A')
    for data in dns_result:
        ips.add(data)


for el in d['settings']['servers']['server']:
    o = urlparse(el['@url'])
    domain = o.netloc.split(':')[0]
    try:
        socket.inet_aton(domain)
        ips.add(domain)
    except socket.error:
        pool.apply_async(get_ipaddrs, (domain,))


pool.close()
pool.join()

for i in ips:
    print(i)

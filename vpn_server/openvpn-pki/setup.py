from setuptools import setup


with open('requirements.txt') as f:
    install_requires = f.read().splitlines()

setup(
    name='ovpnpki',
    packages=['ovpnpki'],
    include_package_data=True,
    install_requires=install_requires,
)

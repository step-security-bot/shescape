# Security Policy

## Supported Versions

The table below shows which versions of _Shescape_ are currently supported with
security updates.

| Version | End-of-life |
| ------: | :---------- |
|   1.x.x | -           |
|   0.x.x | 2021-02-01  |

_This table only includes information on versions `<2.0.0`._

## Reporting a Vulnerability

The maintainers of this project take security issues seriously. We appreciate
your efforts to responsibly disclose your findings. Due to the non-funded and
open-source nature of this project, we take a best-efforts approach when it
comes to engaging with (security) reports.

To report a security issue in the latest version of a supported version range,
send an email to [security@ericcornelissen.dev] with the terms "SECURITY" and
"shescape" in the subject line. Please do not open a regular issue or Pull
Request in the public repository.

If you found a security issue in an unsupported version of the project, or if
the latest version of a supported version range isn't affected, please report it
publicly. For example, as a regular issue in the public repository. If in doubt,
report the issue privately.

### What to Include in a Report

Try to include as many of the following items as possible in a security report:

- An explanation of the issue
- A proof of concept exploit
- A suggested severity
- Relevant [CWE] identifiers
- The latest affected version
- The earliest affected version
- A suggested patch
- An automated regression test
- A fuzz input seed or test

## Advisories

> **Note**: Ordered most to least recent.

| ID               | Date       | Affected versions | Patched versions |
| :--------------- | :--------- | :---------------- | :--------------- |
| `CVE-2022-25918` | 2022-10-25 | `>=1.5.10 <1.6.1` | `>=1.6.1`        |
| `CVE-2022-36064` | 2022-08-29 | `>=1.5.1 <1.5.10` | `>=1.5.10`       |
| `CVE-2022-31180` | 2022-07-26 | `>=1.4.0 <1.5.8`  | `>=1.5.8`        |
| `CVE-2022-31179` | 2022-07-26 | `<1.5.8`          | `>=1.5.8`        |
| `CVE-2022-24725` | 2022-03-03 | `>=1.4.0 <1.5.1`  | `>=1.5.1`        |
| `CVE-2021-21384` | 2021-03-19 | `<1.1.3`          | `>=1.1.3`        |

## Acknowledgments

We would like to publicly thank the following reporters:

- Elliot Ward ([@mowzk]) from [Snyk]

[cwe]: https://cwe.mitre.org/
[@mowzk]: https://github.com/mowzk
[security@ericcornelissen.dev]: mailto:security@ericcornelissen.dev?subject=SECURITY%20%28shescape%29
[snyk]: https://snyk.io/

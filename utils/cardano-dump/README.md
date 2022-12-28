# cardano-dump

## Dependencies

`curl`, `jq`

## Help output

```
Usage: ./cardano-dump.sh TARGET [OPTIONS...]

Query cardano-db and get JSON output of the passed TARGET

TARGETS

   fd   Funds
   ch   Challenges
   pp   Proposals

OPTIONS

   -e   Filter results by given epoch number
   -E   Filter results by given epoch numbers range
            comma-separated, no spaces
            (e.g -E "32,37")
   -f   Filter results by given fund hashes
            single value or comma-separated, no spaces
   -c   Filter results by given challenge IDs
            single value or comma-separated, no spaces

   -u   Specify cardano-db API URL
            (default https://postgrest-api-iohk-preprod.ze.lc)
   -k   Specify metadata key
            (default 810949)
   -v   Specify metadata version
            (default 1.1.0)

   -p   Prettify JSON output
   -h   Display this help and exit
```

## Usage examples

> Assuming the script is in your current working directory

### Funds

#### All funds

```
./cardano-dump.sh fd
```

#### Funds registered during epoch 37

```
./cardano-dump.sh fd -e 37
```

#### Funds registered from epoch 35 to 38 inclusive

```
./cardano-dump.sh fd -e 35,38
```

### Challenges

#### All challenges

```
./cardano-dump.sh ch
```

#### Challenges defined in given fund

```
./cardano-dump.sh ch -f 12748f107c5fa2c828f178bed1f009f320455deb7a06f3b9589439be8adc800e
```

#### Challenges defined in multiple given funds

```
./cardano-dump.sh ch -f \
12748f107c5fa2c828f178bed1f009f320455deb7a06f3b9589439be8adc800e,\
3f3214c5511de3e6b48b51260169ca7b8ea4e3f3712ae69feecdfdd3f4d7cf55
```

### Proposals

#### All proposals

```
./cardano-dump.sh pp
```

#### Proposals for challenges in given fund

```
./cardano-dump.sh pp -f 3f3214c5511de3e6b48b51260169ca7b8ea4e3f3712ae69feecdfdd3f4d7cf55
```

#### Proposals for specific challenge in given fund

```
./cardano-dump.sh pp -f 12748f107c5fa2c828f178bed1f009f320455deb7a06f3b9589439be8adc800e -c 1001
```

> You can also use epoch specifying params with challenges and proposals

### Common

#### Prettify JSON output by adding indentation with `-p` option

```
./cardano-dump.sh ch -p
```

#### Save result to file

Use standard output redirect

```
./cardano-dump.sh fd > funds.json
```

### Change API request params

You can specify cardano-db API endpoint url, metadata key and version. E.g list of funds version `0.1.0`

```
./cardano-dump.sh fd -v 0.1.0
```

---

##### alxevvv

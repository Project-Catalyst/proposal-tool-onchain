#!/bin/bash

postgrest_api_url="https://postgrest-api-iohk-preprod.ze.lc"
tx_metadata_key="810949"
tx_metadata_version="1.1.0"

args=""

action_param="&json-%3E%3Eaction=eq."
funds_params=""
challenges_params=""
epoch_params=""

prettify=""

function display_help()
{
    echo "Usage: $0 TARGET [OPTIONS...]"
    echo
    echo "Query cardano-db and get JSON output of the passed TARGET"
    echo
    echo "TARGETS"
    echo
    echo "   fd   Funds"
    echo "   ch   Challenges"
    echo "   pp   Proposals"
    echo
    echo "OPTIONS"
    echo
    echo "   -e   Filter results by given epoch number"
    echo "   -E   Filter results by given epoch numbers range"
    echo "            comma-separated, no spaces"
    echo "            (e.g -E \"32,37\")"
    echo "   -f   Filter results by given fund hashes"
    echo "            single value or comma-separated, no spaces"
    echo "   -c   Filter results by given challenge IDs"
    echo "            single value or comma-separated, no spaces"
    echo
    echo "   -u   Specify cardano-db API URL"
    echo "            (default $postgrest_api_url)"
    echo "   -k   Specify metadata key"
    echo "            (default $tx_metadata_key)"
    echo "   -v   Specify metadata version"
    echo "            (default $tx_metadata_version)"
    echo
    echo "   -p   Prettify JSON output"
    echo "   -h   Display this help and exit"
    echo
    exit 0
}

function preserve_escaped()
{
    echo $1 | sed 's/\\\\x//g' | sed 's/\\/\\\\/g'
}

function pretty_json()
{
    preserve_escaped "$1" | grep -Eo '"([^"\]*(\\")*(\\[^"])*)*" *(: *([0-9]*|"([^"\]*(\\")*(\\[^"])*)*")[^{}\["]*|,)?|[^"\]\[\}\{]*|\{|\},?|\[|\],?|[0-9]+ *,?|,' | awk '{if ($0 ~ /^[]}]/ ) offset-=2; c=0; while (c++<offset) printf " "; printf "%s\n",$0; if ($0 ~ /^[[{]/) offset+=2}'
}

while [ $# -gt 0 ]
do
    unset OPTIND
    unset OPTARG
    while getopts hpu:k:v:f:c:e:E: option
    do
        case $option in
            h) display_help
            ;;
            p) prettify="1"
            ;;
            u) postgrest_api_url="$OPTARG"
            ;;
            k) tx_metadata_key="$OPTARG"
            ;;
            v) tx_metadata_version="$OPTARG"
            ;;
            f) funds_params="&json-%3Epayload-%3E%3EfundHash=in.(${OPTARG})"
            ;;
            c) challenges_params="&json-%3Epayload-%3E%3EchallengeId=in.(${OPTARG})"
            ;;
            e) epoch_params="&tx.block.epoch_no=eq.${OPTARG}"
            ;;
            E) epoch_params="&tx.block.epoch_no=gte.$(echo $OPTARG | cut -d',' -f1)&tx.block.epoch_no=lte.$(echo $OPTARG | cut -d',' -f2)"
            ;;
        esac
    done
    shift $((OPTIND-1))
    args="${args} $1"
    shift
done

target=$(echo $args | tr -d '[:space:]')

base_url="${postgrest_api_url}/tx_metadata?key=eq.${tx_metadata_key}&json-%3E%3Eversion=eq.${tx_metadata_version}&select=*,tx!inner(hash,block!inner(time,epoch_no))"

url=""

if [[ $target == 'fd' ]]; then
    action_param="${action_param}fundGenesis"
    url="${base_url}${action_param}${epoch_params}"
    
    elif [[ $target == 'ch' ]]; then
    action_param="${action_param}fundGenesis"
    url="${base_url}${action_param}${funds_params}${epoch_params}"
    
    elif [[ $target == 'pp' ]]; then
    action_param="${action_param}proposalPublication"
    url="${base_url}${action_param}${funds_params}${challenges_params}${epoch_params}"
    
else
    display_help
fi

if [[ -z $url ]]; then
    echo "URL construction error"
    exit 1
fi

result=$(curl $url)

if [[ $target == 'ch' ]]; then
    result=$(echo $result | jq 'map(.json.payload.fundGenesis.challenges) | flatten')
fi

if [[ -n $prettify ]]; then
    result=$(pretty_json "$result")
else
    result=$(preserve_escaped "$result")
fi

printf "$result\n"

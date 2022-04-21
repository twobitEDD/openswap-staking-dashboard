import { BASE_URL } from '@/constants';
import axios from 'axios'
import { utils } from 'ethers';
import { Networks } from '@/utility/networks.interface';




const networks: Networks[] = [
    {
        chainId: 1666600000,
        apiURL: BASE_URL + 'mainnet/',
        rpcURL: 'https://api.harmony.one',
        explorer: 'https://explorer.harmony.one/',
        name: 'Harmony Mainnet',
        hasPrice: true,
        delegatorAddress: '0xe6dd98403ec2661a4bb1fb73b64e7df9bd9b1045'
    },
    {
        chainId: 1666700000,
        apiURL: BASE_URL + 'testnet/',
        rpcURL: 'https://api.s0.b.hmny.io',
        explorer: 'https://explorer.pops.one/',
        name: 'Harmony Testnet',
        hasPrice: true,
        delegatorAddress: '0x00000000000000000000000000000000000000fc'
    }
]

export default {
    bodyParams(method: string, params: string[]) {
        return `{
        "jsonrpc": "2.0",
        "method": "${method}",
        "params": ${JSON.stringify(params)},
        "id": 1
      }`},
    getHarmonyNetwork(chainId: number) {
        return networks.find((network) => network.chainId === chainId)
    },
    getNetworkInfo(chainId: number) {
        const networkAPI = this.getHarmonyNetwork(chainId)?.apiURL
        return axios.get(networkAPI + 'network_info_lite/', {})
    },
    getValidators(chainId: number) {
        const networkAPI = this.getHarmonyNetwork(chainId)?.apiURL
        return axios.get(networkAPI + 'validators/', {})
    },
    getValidator(chainId: number, validator: string) {
        const networkAPI = this.getHarmonyNetwork(chainId)?.apiURL
        return axios.get(networkAPI + `validators/${validator}`, {})
    },
    getValidatorHistory(chainId: number, validator: string) {
        const networkAPI = this.getHarmonyNetwork(chainId)?.apiURL
        return axios.get(networkAPI + `validator_history/${validator}`, {})
    },
    async getDelegations(chainId: number, address: string) {
        const networkAPI = this.getHarmonyNetwork(chainId)?.apiURL
        return axios.get(networkAPI + `delegations/${address}`)
    },
    async getBalance(chainId: number, address: string) {
        const res = await axios({
            method: "post",
            url: this.getHarmonyNetwork(chainId)?.rpcURL,
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json"
            },
            data: this.bodyParams("hmy_getBalance", [address, "latest"])
        })

        let coins = '0'

        try {
            coins = utils.formatUnits(res.data.result, 18)
        } catch (e) {
            console.error(e)
        }

        return coins
    }
}
import { segment } from "icqq";
import plugin from '../../lib/plugins/plugin.js';
/**
 * date:2023.10.29
 * Author: GuestLiang (github.com/GuestLiang)
 * 不只是按锅巴中设置的那些大插件屏蔽指令，现在更可细分按群按指令屏蔽，具体到某一正则表达式
 */

/**
 * 群号123456中你想屏蔽的指令，添加群按照格式添加
 */
const GroupRegex = {
    '123456': /^#?椰奶状态(pro)?$|^#?运行状态$/,
    '961609439': /^#签到$|^#状态$/,
};

export class fengkong extends plugin{
    constructor(){
        super({
            name: '按群屏蔽指定指令',
            dsc: '按群屏蔽指定指令',
            event: 'message',
            priority: 1,
            rule: [
                {
                    reg: '^(.*)$', //过滤所有消息
                    fnc: 'pingbi'
                },
            ]
        })
    }
    async pingbi(e){
        if (e.isMaster) return false; //主人放行
        if (!GroupRegex[e.group_id]) {
            // console.log(`来自群${e.group_id}的消息，没有屏蔽指令，已放行`)
            return false; //如果没有对应的群号的正则，就放行
        } else {
            if (GroupRegex[e.group_id].test(e.msg)){
                e.reply(`权限不足，执行该指令的最低权限为：Master\n可联系bot主人调整`);
                return true;
            }
            return false;
        }
    }
}
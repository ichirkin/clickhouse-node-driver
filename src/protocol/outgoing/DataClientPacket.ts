import * as defines from '../../defines'
import { writeBinaryString } from '../../writer'
import BlockPacket from './BlockPacket'
import { ClientPacketTypes } from '../enums'
import { ClientPacket } from '../_packet'
import { BaseBlock } from '../../block'

export interface DataClientPacketData {
  block: BaseBlock;
  tableName: string;
}
export default class DataClientPacket extends ClientPacket<DataClientPacketData> {
  type = ClientPacketTypes.DATA

  _write ({ block, tableName }: DataClientPacketData): void {
    if (this.conn.serverInfo.revision >= defines.DBMS_MIN_REVISION_WITH_TEMPORARY_TABLES) {
      writeBinaryString(tableName, this.stream)
    }
    const blockPacket = new BlockPacket(this.conn, { block })
    blockPacket.write()
  }
}

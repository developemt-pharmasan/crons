const path = require('node:path')
const dayjs = require('dayjs')
const fs = require('node:fs')
module.exports = async (data) => {
  const { sequelize } = require('../../../database/models')
  const userWs = fs.readFileSync(path.join(__dirname, '../../../bundle/ordrSync/queries', 'userWs.query.sql'), 'utf8')
  const pacientesql = fs.readFileSync(path.join(__dirname, '../../../bundle/ordrSync/queries', 'paciente.query.sql'), 'utf8')
  return Promise.all([
    await sequelize.query(userWs, {  type: sequelize.QueryTypes.SELECT, replacements: { userId: data.createdBy }, plain: true }),
    await sequelize.query(pacientesql, {  type: sequelize.QueryTypes.SELECT, replacements: { NmrIdentf: data.U_PHR_NumDcto, TpoIdentf: data.U_ACS_TpoIdentf, Rango: data.U_PHR_RangSalarial }, plain: true })

  ]).then(async ([user, paciente]) => {
    const CtMod = data.DocumentLines.find(x => x.ItemCode === 'CT_0002')
    const TextJson = {
      "DocDate": data.FechaDocumento,
      "DocDueDate": data.FechaDocumento,
      "TaxDate": data.FechaDocumento,
      "CardCode": data.CardCode,
      "JournalMemo": `Sales Orders - ${data.CardCode}`,
      "U_PHR_ModContrato": data.U_PHR_ModContrato,
      "U_PHR_Autorizacion": data.U_PHR_Autorizacion,
      "U_PHR_EPS_Paciente": paciente ? paciente.U_ACS_NmbEntidad: null,
      "U_PHR_RangSalarial": data.U_PHR_RangSalarial,
      "U_PHR_NomPaciente": paciente ? paciente.U_ACS_NmbPct : null,
      "U_PHR_MotAutoriza": data.U_PHR_MotAutoriza,
      "U_PHR_DiagnosPpal":data.U_PHR_DiagnosPpal,
      "U_PHR_DiagnosSecu": data.U_PHR_DiagnosSecu,
      "U_PHR_AutoEntrega": data.U_PHR_AutoEntrega,
      "U_PHR_NumDcto": data.U_PHR_NumDcto,
      "U_PHR_CodPac": paciente ? paciente.U_ACS_CdgPct : null,
      "U_PHR_Exorera": data.U_PHR_Exorera,
      "U_PHR_ExModera": data.U_PHR_ExModera,
      "U_PHR_Bodega": data.U_PHR_Bodega,
      "U_PHR_RegPac": `0${data.U_PHR_RegPac}`,
      "U_PHR_UserWs": user.full_name,
      "U_PHR_CodMunicipio": data.U_PHR_CodMunicipio,
      "U_PHR_Portabilidad": data.U_PHR_Portabilidad,
      "U_PHR_TipoDocumento": data.U_ACS_TpoIdentf,
      "U_PHR_CtMod": CtMod ? CtMod.UnitPrice : 0,
      "U_PG_IdOv": data.Id,
      "Comments": data.Comments,
      "DocumentLines": data.DocumentLines.map(x => {
        return {
          "ItemCode": x.ItemCode,
          "WarehouseCode": x.WarehouseCode,
          "Quantity": x.Quantity,
          "UnitPrice": x.UnitPrice, // -> lista precio * numinSale
          "U_PHR_SeguiEntrega": x.U_PHR_SeguiEntrega,
          "U_PHR_NumEntregas": x.U_PHR_NumEntregas,
          "U_PHR_Exonerado": x.U_PHR_Exonerado,
          "U_PHR_CuotaRecupe": x.U_PHR_CuotaRecupe,
          "U_PHR_CtdPrescrita": x.U_PHR_CtdPrescrita,
          "U_PHR_FecPrescrip": x.U_PHR_FecPrescrip,
          "U_PHR_Frecuencia": x.U_PHR_Frecuencia,
          "U_PHR_DuraTratami": x.U_PHR_DuraTratami,
          "U_PHR_CtoAsociado": x.U_PHR_CtoAsociado,
          "U_PHR_CdHomologo": x.U_PHR_CdHomologo,
          "U_PHR_NomHomologo": x.U_PHR_NomHomologo,
          "U_PHR_CntHomologo": x.U_PHR_CntHomologo,
          "U_PHR_PrHomologo": x.U_PHR_PrHomologo,
          "U_PHR_TotalHomologo": x.U_PHR_TotalHomologo,
          "U_PHR_NumAutoriza": x.U_PHR_NumAutoriza ? x.U_PHR_NumAutoriza : '',
          "U_PHR_FecAutoriza": x.U_PHR_FecAutoriza ? x.U_PHR_FecAutoriza : '',
          "U_PHR_NoAcCTC": x.U_PHR_NoAcCTC,
          "U_PHR_FchAcCTC": x.U_PHR_FchAcCTC,
          "U_PHR_FchSolActCTC": x.U_PHR_FchSolActCTC,
          "U_PHR_CodMipres": x.U_PHR_CodMipres,
          "U_PHR_NumDirec": x.U_PHR_NumDirec,
          "U_PHR_FecPres": x.U_PHR_FecPres,
          "U_PHR_JunMedi": x.U_PHR_JunMedi,
          "U_PHR_Siniestro": x.U_PHR_Siniestro,
          "CostingCode": x.CostingCode,
          "U_PHR_Sta_Pen": x.ItemCode.includes('CT') ? null : 1, // marcar como pendiente
          "U_PHR_RegMed": x.U_PHR_RegMed,
          "U_PHR_NomMed": x.Medico ? x.Medico.NomMedico : '',
          "U_PHR_IPSPrest": x.Ips ? x.Ips.NomIps : '',
          "U_PG_IdOvDt": x.Id,
          "U_PG_IdOv": data.Id,
        }
      })
    }
    return {
      DocDate: dayjs(data.FechaContabilizacion).format('YYYY-MM-DD'),
      TextJson: JSON.stringify(TextJson),
      CreatedBy: data.createdBy,
      NumOv: data.Id,
      Status: 1,
    }
  })
}

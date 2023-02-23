'use strict';
const {Model} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class MipresDireccionamiento extends Model {
        static associate(models) {
            // models.MipresDireccionamiento.hasMany(models.NoPbsDocumentos, {
            //     foreignKey: 'noPrescripcion',
            //     sourceKey: 'NoPrescripcion',
            //     as: 'awsDocumentos'
            // });
            // models.MipresDireccionamiento.hasMany(models.Nopbs_Documentos_Facturas, {
            //     foreignKey: 'numeroFactura',
            //     sourceKey: 'FacturaNumero',
            //     as: 'awsDocumentosFactura'
            // });
            // models.MipresDireccionamiento.hasOne(models.PacientesDocumento, {
            //     as: 'miprePaciente',
            //     foreignKey: 'documento',
            //     sourceKey: 'NoIDPaciente'
            // });
            // models.MipresDireccionamiento.hasOne(models.ServiceType, {
            //     as: 'mipresTipoServicio',
            //     foreignKey: 'code',
            //     sourceKey: 'TipoTec'
            // });
        }
    }

    MipresDireccionamiento.init({
        IDDireccionamiento: DataTypes.INTEGER,
        NoPrescripcion: DataTypes.STRING,
        TipoTec: DataTypes.STRING,
        ConTec: DataTypes.STRING,
        TipoIDPaciente: DataTypes.STRING,
        NoIDPaciente: DataTypes.STRING,
        NoEntrega: DataTypes.INTEGER,
        NoSubEntrega: DataTypes.INTEGER,
        TipoIDProv: DataTypes.STRING,
        NoIDProv: DataTypes.STRING,
        CodMunEnt: DataTypes.STRING,
        FecMaxEnt: DataTypes.STRING,
        CantTotAEntregar: DataTypes.STRING,
        //CantTotAEntregarEnd: DataTypes.STRING,
        DirPaciente: DataTypes.STRING,
        CodSerTecAEntregar: DataTypes.STRING,
        NoIDEPS: DataTypes.STRING,
        CodEPS: DataTypes.STRING,
        FecDireccionamiento: DataTypes.STRING,
        EstDireccionamiento: DataTypes.INTEGER,
        FecAnulacion: DataTypes.STRING,
        IDInterna: DataTypes.INTEGER,
        IDProgramacion: DataTypes.INTEGER,
        CodSedeProv: DataTypes.STRING,
        InfoEstDireccionamiento: DataTypes.STRING,
        EstProgramacion: DataTypes.INTEGER,
        FecProgramacion: DataTypes.STRING,
        IDEntrega: DataTypes.INTEGER,
        FecEntrega: DataTypes.STRING,
        CodSerTecEntregado: DataTypes.STRING,
        CantTotEntregada: DataTypes.INTEGER,
        EntTotal: DataTypes.INTEGER,
        CausaNoEntrega: DataTypes.INTEGER,
        NoLote: DataTypes.STRING,
        TipoIDRecibe: DataTypes.STRING,
        NoIDRecibe: DataTypes.INTEGER,
        EstEntrega: DataTypes.INTEGER,
        CodigosEntrega: DataTypes.STRING,
        IDReporteEntrega: DataTypes.INTEGER,
        FecRepEntrega: DataTypes.STRING,
        EstRepEntrega: DataTypes.INTEGER,
        EstadoEntrega: DataTypes.INTEGER,
        ValorEntregado: DataTypes.INTEGER,
        CodTecEntregado: DataTypes.STRING,
        createdBy: DataTypes.INTEGER,
        createdAt: DataTypes.DATE,
        updatedAt: DataTypes.DATE,
        IsValid: DataTypes.INTEGER,
        DireccionadoCliente: DataTypes.BOOLEAN,
        EntregaCliente: DataTypes.BOOLEAN,
        FacturaNumero: DataTypes.STRING,
        FacturaCufe: DataTypes.STRING,
        IdProveedorSede: DataTypes.INTEGER,
        TypeProveedorSede: DataTypes.INTEGER,
        CodSerTecAEntregarEnd: DataTypes.STRING,
      valortotalfactura: DataTypes.INTEGER,
      idfacturacion: DataTypes.INTEGER,
      cuotamoder: DataTypes.INTEGER,
      copago: DataTypes.INTEGER,
    }, {
        sequelize,
        modelName: 'MipresDireccionamiento',
        tableName: 'mipres_direccionamiento'
    });
    return MipresDireccionamiento;
};
import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { Translate, ICrudGetAction, openFile, byteSize } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './empresa.reducer';
import { IEmpresa } from 'app/shared/model/empresa.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IEmpresaDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const EmpresaDetail = (props: IEmpresaDetailProps) => {
  useEffect(() => {
    props.getEntity(props.match.params.id);
  }, []);

  const { empresaEntity } = props;
  return (
    <Row>
      <Col md="8">
        <h2>
          <Translate contentKey="appKaazarApp.empresa.detail.title">Empresa</Translate> [<b>{empresaEntity.id}</b>]
        </h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="nombreEmpresa">
              <Translate contentKey="appKaazarApp.empresa.nombreEmpresa">Nombre Empresa</Translate>
            </span>
          </dt>
          <dd>{empresaEntity.nombreEmpresa}</dd>
          <dt>
            <span id="rucEmpresa">
              <Translate contentKey="appKaazarApp.empresa.rucEmpresa">Ruc Empresa</Translate>
            </span>
          </dt>
          <dd>{empresaEntity.rucEmpresa}</dd>
          <dt>
            <span id="direccion">
              <Translate contentKey="appKaazarApp.empresa.direccion">Direccion</Translate>
            </span>
          </dt>
          <dd>{empresaEntity.direccion}</dd>
          <dt>
            <span id="logo">
              <Translate contentKey="appKaazarApp.empresa.logo">Logo</Translate>
            </span>
          </dt>
          <dd>
            {empresaEntity.logo ? (
              <div>
                {empresaEntity.logoContentType ? (
                  <a onClick={openFile(empresaEntity.logoContentType, empresaEntity.logo)}>
                    <img src={`data:${empresaEntity.logoContentType};base64,${empresaEntity.logo}`} style={{ maxHeight: '30px' }} />
                  </a>
                ) : null}
                <span>
                  {empresaEntity.logoContentType}, {byteSize(empresaEntity.logo)}
                </span>
              </div>
            ) : null}
          </dd>
          <dt>
            <span id="colorTema">
              <Translate contentKey="appKaazarApp.empresa.colorTema">Color Tema</Translate>
            </span>
          </dt>
          <dd>{empresaEntity.colorTema}</dd>
        </dl>
        <Button tag={Link} to="/empresa" replace color="info">
          <FontAwesomeIcon icon="arrow-left" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.back">Back</Translate>
          </span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/empresa/${empresaEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.edit">Edit</Translate>
          </span>
        </Button>
      </Col>
    </Row>
  );
};

const mapStateToProps = ({ empresa }: IRootState) => ({
  empresaEntity: empresa.entity,
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(EmpresaDetail);

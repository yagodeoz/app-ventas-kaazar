import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, Label } from 'reactstrap';
import { AvFeedback, AvForm, AvGroup, AvInput, AvField } from 'availity-reactstrap-validation';
import { Translate, translate, ICrudGetAction, ICrudGetAllAction, setFileData, openFile, byteSize, ICrudPutAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IRootState } from 'app/shared/reducers';

import { getEntity, updateEntity, createEntity, setBlob, reset } from './empresa.reducer';
import { IEmpresa } from 'app/shared/model/empresa.model';
import { convertDateTimeFromServer, convertDateTimeToServer, displayDefaultDateTime } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface IEmpresaUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const EmpresaUpdate = (props: IEmpresaUpdateProps) => {
  const [isNew, setIsNew] = useState(!props.match.params || !props.match.params.id);

  const { empresaEntity, loading, updating } = props;

  const { logo, logoContentType } = empresaEntity;

  const handleClose = () => {
    props.history.push('/empresa');
  };

  useEffect(() => {
    if (isNew) {
      props.reset();
    } else {
      props.getEntity(props.match.params.id);
    }
  }, []);

  const onBlobChange = (isAnImage, name) => event => {
    setFileData(event, (contentType, data) => props.setBlob(name, data, contentType), isAnImage);
  };

  const clearBlob = name => () => {
    props.setBlob(name, undefined, undefined);
  };

  useEffect(() => {
    if (props.updateSuccess) {
      handleClose();
    }
  }, [props.updateSuccess]);

  const saveEntity = (event, errors, values) => {
    if (errors.length === 0) {
      const entity = {
        ...empresaEntity,
        ...values,
      };

      if (isNew) {
        props.createEntity(entity);
      } else {
        props.updateEntity(entity);
      }
    }
  };

  return (
    <div>
      <Row className="justify-content-center">
        <Col md="8">
          <h2 id="appKaazarApp.empresa.home.createOrEditLabel">
            <Translate contentKey="appKaazarApp.empresa.home.createOrEditLabel">Create or edit a Empresa</Translate>
          </h2>
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col md="8">
          {loading ? (
            <p>Loading...</p>
          ) : (
            <AvForm model={isNew ? {} : empresaEntity} onSubmit={saveEntity}>
              {!isNew ? (
                <AvGroup>
                  <Label for="empresa-id">
                    <Translate contentKey="global.field.id">ID</Translate>
                  </Label>
                  <AvInput id="empresa-id" type="text" className="form-control" name="id" required readOnly />
                </AvGroup>
              ) : null}
              <AvGroup>
                <Label id="nombreEmpresaLabel" for="empresa-nombreEmpresa">
                  <Translate contentKey="appKaazarApp.empresa.nombreEmpresa">Nombre Empresa</Translate>
                </Label>
                <AvField id="empresa-nombreEmpresa" type="text" name="nombreEmpresa" />
              </AvGroup>
              <AvGroup>
                <Label id="rucEmpresaLabel" for="empresa-rucEmpresa">
                  <Translate contentKey="appKaazarApp.empresa.rucEmpresa">Ruc Empresa</Translate>
                </Label>
                <AvField id="empresa-rucEmpresa" type="text" name="rucEmpresa" />
              </AvGroup>
              <AvGroup>
                <Label id="direccionLabel" for="empresa-direccion">
                  <Translate contentKey="appKaazarApp.empresa.direccion">Direccion</Translate>
                </Label>
                <AvField id="empresa-direccion" type="text" name="direccion" />
              </AvGroup>
              <AvGroup>
                <AvGroup>
                  <Label id="logoLabel" for="logo">
                    <Translate contentKey="appKaazarApp.empresa.logo">Logo</Translate>
                  </Label>
                  <br />
                  {logo ? (
                    <div>
                      {logoContentType ? (
                        <a onClick={openFile(logoContentType, logo)}>
                          <img src={`data:${logoContentType};base64,${logo}`} style={{ maxHeight: '100px' }} />
                        </a>
                      ) : null}
                      <br />
                      <Row>
                        <Col md="11">
                          <span>
                            {logoContentType}, {byteSize(logo)}
                          </span>
                        </Col>
                        <Col md="1">
                          <Button color="danger" onClick={clearBlob('logo')}>
                            <FontAwesomeIcon icon="times-circle" />
                          </Button>
                        </Col>
                      </Row>
                    </div>
                  ) : null}
                  <input id="file_logo" type="file" onChange={onBlobChange(true, 'logo')} accept="image/*" />
                  <AvInput type="hidden" name="logo" value={logo} />
                </AvGroup>
              </AvGroup>
              <AvGroup>
                <Label id="colorTemaLabel" for="empresa-colorTema">
                  <Translate contentKey="appKaazarApp.empresa.colorTema">Color Tema</Translate>
                </Label>
                <AvField id="empresa-colorTema" type="text" name="colorTema" />
              </AvGroup>
              <Button tag={Link} id="cancel-save" to="/empresa" replace color="info">
                <FontAwesomeIcon icon="arrow-left" />
                &nbsp;
                <span className="d-none d-md-inline">
                  <Translate contentKey="entity.action.back">Back</Translate>
                </span>
              </Button>
              &nbsp;
              <Button color="primary" id="save-entity" type="submit" disabled={updating}>
                <FontAwesomeIcon icon="save" />
                &nbsp;
                <Translate contentKey="entity.action.save">Save</Translate>
              </Button>
            </AvForm>
          )}
        </Col>
      </Row>
    </div>
  );
};

const mapStateToProps = (storeState: IRootState) => ({
  empresaEntity: storeState.empresa.entity,
  loading: storeState.empresa.loading,
  updating: storeState.empresa.updating,
  updateSuccess: storeState.empresa.updateSuccess,
});

const mapDispatchToProps = {
  getEntity,
  updateEntity,
  setBlob,
  createEntity,
  reset,
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(EmpresaUpdate);

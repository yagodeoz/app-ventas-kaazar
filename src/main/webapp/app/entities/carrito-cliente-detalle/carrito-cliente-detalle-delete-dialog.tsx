import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { RouteComponentProps } from 'react-router-dom';
import { Modal, ModalHeader, ModalBody, ModalFooter, Button } from 'reactstrap';
import { Translate, ICrudGetAction, ICrudDeleteAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { ICarritoClienteDetalle } from 'app/shared/model/carrito-cliente-detalle.model';
import { IRootState } from 'app/shared/reducers';
import { getEntity, deleteEntity } from './carrito-cliente-detalle.reducer';

export interface ICarritoClienteDetalleDeleteDialogProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const CarritoClienteDetalleDeleteDialog = (props: ICarritoClienteDetalleDeleteDialogProps) => {
  useEffect(() => {
    props.getEntity(props.match.params.id);
  }, []);

  const handleClose = () => {
    props.history.push('/carrito-cliente-detalle' + props.location.search);
  };

  useEffect(() => {
    if (props.updateSuccess) {
      handleClose();
    }
  }, [props.updateSuccess]);

  const confirmDelete = () => {
    props.deleteEntity(props.carritoClienteDetalleEntity.id);
  };

  const { carritoClienteDetalleEntity } = props;
  return (
    <Modal isOpen toggle={handleClose}>
      <ModalHeader toggle={handleClose}>
        <Translate contentKey="entity.delete.title">Confirm delete operation</Translate>
      </ModalHeader>
      <ModalBody id="appKaazarApp.carritoClienteDetalle.delete.question">
        <Translate contentKey="appKaazarApp.carritoClienteDetalle.delete.question" interpolate={{ id: carritoClienteDetalleEntity.id }}>
          Are you sure you want to delete this CarritoClienteDetalle?
        </Translate>
      </ModalBody>
      <ModalFooter>
        <Button color="secondary" onClick={handleClose}>
          <FontAwesomeIcon icon="ban" />
          &nbsp;
          <Translate contentKey="entity.action.cancel">Cancel</Translate>
        </Button>
        <Button id="jhi-confirm-delete-carritoClienteDetalle" color="danger" onClick={confirmDelete}>
          <FontAwesomeIcon icon="trash" />
          &nbsp;
          <Translate contentKey="entity.action.delete">Delete</Translate>
        </Button>
      </ModalFooter>
    </Modal>
  );
};

const mapStateToProps = ({ carritoClienteDetalle }: IRootState) => ({
  carritoClienteDetalleEntity: carritoClienteDetalle.entity,
  updateSuccess: carritoClienteDetalle.updateSuccess,
});

const mapDispatchToProps = { getEntity, deleteEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(CarritoClienteDetalleDeleteDialog);

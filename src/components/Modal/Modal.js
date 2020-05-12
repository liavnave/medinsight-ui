import React, { useEffect, useState, useRef } from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import './Modal.scss';
import classNames from 'classnames';

const noop = () => {};

const Modal = (props) => {
    const [modalStyle, setModalStyle] = useState({});
    const [triangleStyle, setTriangleStyle] = useState({});
    const [prevAnchorDirection, setPrevAnchorDirection] = useState({
        anchorDirectionX: null,
        anchorDirectionY: null,
    });
    const [isShow, setIsShow] = useState(false);
    const modalRef = useRef();
    const overlayRef = useRef();

    const {
        anchor,
        isShowTriangle,
        anchorDirectionX,
        anchorDirectionY,
        modalClasses,
        modalType,
        overlayClasses,
        showOverlay,
        onOverlayClick,
        onOverlayMouseMove,
        onRender,
        children,
    } = props;

    let modalPosition = {};
    let trianlgePosition = {};
    let forceHideTriangle = false;

    const calculateTrianglePositionX = () => {
        const modalLeft = (modalPosition.left
            || modalRef.current.getBoundingClientRect().left);
        const modalStartX = modalLeft + 20;
        const modalEndX = modalStartX + modalRef.current.offsetWidth - 20;
        const anchorCenterX = anchor.current.getBoundingClientRect().left
            + (anchor.current.offsetWidth / 2);
        let triangleLeft;

        if (modalStartX < anchorCenterX && anchorCenterX < modalEndX) {
            triangleLeft = anchorCenterX - modalLeft - 10;
        } else if (anchorCenterX < modalStartX) {
            triangleLeft = '-10px';
        } else if (anchorCenterX > modalEndX) {
            triangleLeft = 'calc(100% - 10px)';
        }

        if (triangleLeft) {
            trianlgePosition.left = triangleLeft;
        }
    };

    const calculateTrianglePositionY = () => {
        const modalTop = (modalPosition.top
            || modalRef.current.getBoundingClientRect().top);
        const modalStartY = modalTop + 20;
        const modalEndY = modalStartY + modalRef.current.offsetHeight - 20;
        const anchorCenterY = anchor.current.getBoundingClientRect().top
            + (anchor.current.offsetHeight / 2);
        let triangleTop;

        if (modalStartY < anchorCenterY && anchorCenterY < modalEndY) {
            triangleTop = anchorCenterY - modalTop - 10;
        } else if (anchorCenterY < modalStartY) {
            triangleTop = '-10px';
        } else if (anchorCenterY > modalEndY) {
            triangleTop = 'calc(100% - 10px)';
        }

        if (triangleTop) {
            trianlgePosition.top = triangleTop;
        }
    };

    const calculateTrianglePosition = () => {
        trianlgePosition = {};

        if (isShowTriangle && !forceHideTriangle) {
            calculateTrianglePositionX();
            calculateTrianglePositionY();
        }
        setTriangleStyle(trianlgePosition);
    };

    const calculateModalPosition = () => {
        if (
            prevAnchorDirection.anchorDirectionX === anchorDirectionX
            && prevAnchorDirection.anchorDirectionY === anchorDirectionY
        ) {
            return;
        }

        modalPosition = {};

        if (anchor && anchor.current) {
            let left;
            let top;
            let right;
            let bottom;

            if (anchorDirectionX || anchorDirectionX === 0) {
                left = anchor.current.getBoundingClientRect().left - anchorDirectionX;
                modalPosition.left = left;
                right = left + modalRef.current.offsetWidth;
            }

            if (anchorDirectionY || anchorDirectionY === 0) {
                top = anchor.current.getBoundingClientRect().top - anchorDirectionY;
                modalPosition.top = top;
                bottom = top + modalRef.current.offsetHeight;
            }

            if (right && right > window.innerWidth) {
                modalPosition.right = 10;
                delete modalPosition.left;
                forceHideTriangle = true;
            }

            if (bottom && bottom > window.innerHeight) {
                modalPosition.bottom = 10;
                delete modalPosition.top;
                forceHideTriangle = true;
            }
            setModalStyle(modalPosition);
            calculateTrianglePosition();
            setPrevAnchorDirection({
                anchorDirectionX,
                anchorDirectionY,
            });
        }
        setIsShow(true);
    };

    const modalClassesAll = classNames({
        [modalClasses]: !!modalClasses,
        'modal-show': isShow,
        modal: true,
        [`modal__${modalType}`]: true,
    });
    const overlayClassesAll = classNames({
        [overlayClasses]: !!overlayClasses,
        modal__overlay: true,
        'modal__overlay-show': showOverlay,
    });

    const stopEvents = (e) => {
        e.stopPropagation();
    };

    const handleOverlayClick = (e) => {
        e.preventDefault();
        e.stopPropagation();
        if (typeof onOverlayClick === 'function') {
            onOverlayClick(e);
        }
    };

    const handleOverlayMouseMove = (e) => {
        e.preventDefault();
        e.stopPropagation();
        if (typeof onOverlayMouseMove === 'function') {
            onOverlayMouseMove(e);
        }
    };

    const context = (
        <div
            ref={overlayRef}
            onClick={handleOverlayClick}
            onMouseMove={handleOverlayMouseMove}
            className={overlayClassesAll}
        >
            <div
                ref={modalRef}
                onMouseMove={stopEvents}
                onClick={stopEvents}
                className={modalClassesAll}
                style={modalStyle}
            >
                <div className="modal__container">
                    {children}
                </div>
                {isShowTriangle
                    ? (
                        <div
                            className="modal__triangle"
                            style={triangleStyle}
                        />
                    ) : null}
            </div>
        </div>
    );

    const portal = ReactDOM.createPortal(
        context,
        document.body
    );

    useEffect(() => {
        calculateModalPosition();
    });

    useEffect(() => {
        onRender(modalRef, overlayRef);
    });

    return portal;
};

Modal.propTypes = {
    anchor: PropTypes.object,
    isShowTriangle: PropTypes.bool,
    anchorDirectionX: PropTypes.number,
    anchorDirectionY: PropTypes.number,
    modalClasses: PropTypes.string,
    modalType: PropTypes.string,
    overlayClasses: PropTypes.string,
    showOverlay: PropTypes.bool,
    onOverlayClick: PropTypes.func,
    onOverlayMouseMove: PropTypes.func,
    onRender: PropTypes.func,
    children: PropTypes.any,
};

Modal.defaultProps = {
    anchor: undefined,
    isShowTriangle: false,
    anchorDirectionX: undefined,
    anchorDirectionY: undefined,
    modalClasses: '',
    modalType: 'modal',
    overlayClasses: '',
    showOverlay: false,
    onOverlayClick: noop,
    onOverlayMouseMove: noop,
    onRender: noop,
    children: [],
};

export default Modal;

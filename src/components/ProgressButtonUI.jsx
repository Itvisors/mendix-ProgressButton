import { createElement, useState, useEffect } from "react";

export const possibleStates = {
    LOADING: "loading",
    DISABLED: "disabled",
    SUCCESS: "success",
    ERROR: "error",
    NOTHING: ""
};

export const ProgressButtonUI = ({
    classNamespace = "pb-",
    controlled = false,
    durationError = 1200,
    durationSuccess = 500,
    form,
    onClick = () => {},
    onError = () => {},
    onSuccess = () => {},
    state = possibleStates.NOTHING,
    type,
    shouldAllowClickOnLoading = false,
    className,
    children,
    ...containerProps
}) => {
    const [currentState, setCurrentState] = useState(state);

    const loading = () => {
        setCurrentState(possibleStates.LOADING);
    };

    const notLoading = () => {
        setCurrentState(possibleStates.NOTHING);
    };

    const disable = () => {
        setCurrentState(possibleStates.DISABLED);
    };

    const success = (callback = onSuccess, dontRemove) => {
        setCurrentState(possibleStates.SUCCESS);
        setTimeout(() => {
            if (!dontRemove) setCurrentState(possibleStates.NOTHING);
            if (typeof callback === "function") callback();
        }, durationSuccess);
    };

    const error = (callback = onError, err) => {
        setCurrentState(possibleStates.ERROR);
        setTimeout(() => {
            setCurrentState(possibleStates.NOTHING);
            if (typeof callback === "function") callback(err);
        }, durationError);
    };

    useEffect(() => {
        if (state === currentState) return;

        switch (state) {
            case possibleStates.SUCCESS:
                success();
                break;
            case possibleStates.ERROR:
                error();
                break;
            case possibleStates.LOADING:
                loading();
                break;
            case possibleStates.DISABLED:
                disable();
                break;
            case possibleStates.NOTHING:
                notLoading();
                break;
            default:
                break;
        }
    }, [state]);

    const handlePromise = promise => {
        if (promise && promise.then && promise.catch) {
            promise
                .then(() => {
                    success();
                })
                .catch(err => {
                    error(null, err);
                });
        }
    };
    const handleClick = e => {
        if (controlled) {
            onClick(e);
            return true;
        }

        if (
            (shouldAllowClickOnLoading || currentState !== possibleStates.LOADING) &&
            currentState !== possibleStates.DISABLED
        ) {
            loading();
            const ret = onClick(e);
            handlePromise(ret);
        } else {
            e.preventDefault();
        }
        return true;
    };

    containerProps.className = `${classNamespace}container ${currentState} ${className}`;
    containerProps.onClick = handleClick;

    return (
        <div {...containerProps}>
            <button
                disabled={currentState === possibleStates.DISABLED}
                type={type}
                form={form}
                className={`${classNamespace}button`}
            >
                <span>{children}</span>
                <svg className={`${classNamespace}progress-circle`} viewBox="0 0 41 41">
                    <path d="M38,20.5 C38,30.1685093 30.1685093,38 20.5,38" />
                </svg>
                <svg className={`${classNamespace}checkmark`} viewBox="0 0 70 70">
                    <path d="m31.5,46.5l15.3,-23.2" />
                    <path d="m31.5,46.5l-8.5,-7.1" />
                </svg>
                <svg className={`${classNamespace}cross`} viewBox="0 0 70 70">
                    <path d="m35,35l-9.3,-9.3" />
                    <path d="m35,35l9.3,9.3" />
                    <path d="m35,35l-9.3,9.3" />
                    <path d="m35,35l9.3,-9.3" />
                </svg>
            </button>
        </div>
    );
};

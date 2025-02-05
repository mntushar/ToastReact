import { Fragment } from "react";

import './toast.css'

interface ToastElement extends HTMLLIElement {
    timeoutId?: NodeJS.Timeout;
  }

type ToastDetails = Record<string, unknown>;
  
const toastDetails: ToastDetails = {
    timer: 5000,
    success: "fa-circle-check",
    error: "fa-circle-xmark",
    warning: "fa-triangle-exclamation",
    info: "fa-circle-info",
    random: "fa-solid fa-star"
}

const removeToast = (toast: ToastElement) => {
    toast.classList.add("hide")
    if (toast.timeoutId) clearTimeout(toast.timeoutId)
    setTimeout(() => toast.remove(), 500)
}

const createToast = (toastType: string, text: string) => {
    const toastSection = document.querySelector(".toastSection");

    if (toastSection) {
        const icon = toastDetails[toastType];
        const toast = document.createElement("li") as ToastElement;
        toast.className = `myToast ${toastType}`
        toast.innerHTML = `<div class="column">
                         <i class="fa-solid ${icon}"></i>
                         <span>${text}</span>
                      </div>
                      <i class="fa-solid fa-xmark" onclick="removeToast(this.parentElement)"></i>`
        if(toastSection){
            toastSection.appendChild(toast)
        }
        toast.timeoutId = setTimeout(() => removeToast(toast), toastDetails.timer as number);
    }
}

export const ToastHandler = {
    Success: (text: string) => createToast("success", text),
    Error: (text: string) => createToast("error", text),
    Warning: (text: string) => createToast("warning", text),
    Info: (text: string) => createToast("info", text),
    Random: (text: string) => createToast("random", text)
};

export default function Toast() {
    return (
        <Fragment>
            <ul className="toastSection"></ul>
        </Fragment>
    );
}


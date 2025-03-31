import { background_img_unsplash } from "./api.js";
if (Notification.permission === "default") {
    Notification.requestPermission();
}
background_img_unsplash();
const tarefas = document.querySelector("#tarefas");
const form_princ = document.querySelector("#form_princ");
const inp_tarefa = document.querySelector("#inp_tarefa");
const inp_horas = document.querySelector("#inp_horas");
const inp_data = document.querySelector("#inp_data");
const bt_adicionar = document.querySelector("#bt_adicionar");
const cx_dialog_edt = document.querySelector("#cx_dialog_edt");
const bt_edt_envia = document.querySelector("#bt_edt_envia");
const bt_cancelar = document.querySelector("#bt_cancelar");
const form_edit = document.querySelector("#form_edit");
const inp_edit = document.querySelector("#inp_edit");
const bt_edt_envia_hr_dt = document.querySelector("#bt_edt_envia_hr_dt");
const bt_cancelar_hr_dt = document.querySelector("#bt_cancelar_hr_dt");
const inp_data_edt = document.querySelector("#inp_data_edt");
const inp_horas_edt = document.querySelector("#inp_horas_edt");
const cx_dialog_edt_hr_dt = document.querySelector("#cx_dialog_edt_hr_dt");
const pesq = document.querySelector("#pesq");
const inp_pesq = document.querySelector("#inp_pesq");
const bt_pesquisar = document.querySelector("#bt_pesquisar");
const menu_opcoes = document.querySelector("#menu_opcoes");
const todas_tarefas = document.querySelector("#todas_tarefas");
const tarefas_incompletas = document.querySelector("#tarefas_incompletas");
const tarefas_completas = document.querySelector("#tarefas_completas");
let array_tarefas = [];
document.addEventListener("DOMContentLoaded", () => {
    const tarefasSalvas = localStorage.getItem("Tarefas");
    if (tarefasSalvas) {
        array_tarefas = JSON.parse(tarefasSalvas);
        array_tarefas.forEach((tarefa) => adicionarElementoTarefa(tarefa));
    }
});
form_edit.addEventListener("submit", (e) => {
    e.preventDefault();
});
form_princ.addEventListener("submit", (e) => {
    e.preventDefault();
});
pesq.addEventListener("submit", (e) => {
    e.preventDefault();
});
bt_adicionar.addEventListener("click", () => {
    if (inp_tarefa.value.trim() === "") {
        alert("Você não pode adicionar uma tarefa sem título!");
        return;
    }
    if (inp_data.value.trim() === "" || inp_horas.value.trim() === "") {
        alert("Você não pode adicionar uma tarefa sem data ou hora!");
        return;
    }
    const novaTarefa = {
        titulo: inp_tarefa.value,
        hora: inp_horas.value,
        data: inp_data.value,
        completa: false
    };
    array_tarefas.push(novaTarefa);
    localStorage.setItem("Tarefas", JSON.stringify(array_tarefas));
    adicionarElementoTarefa(novaTarefa);
    inp_tarefa.value = "";
    inp_horas.value = "";
    inp_data.value = "";
});
const chama_notificacao = (titulo, descricao) => {
    if (Notification.permission === "granted") {
        new Notification(titulo, {
            body: descricao,
            icon: "icon/ic.svg"
        });
    }
    else {
        console.error("Úsuario negou permissão as notificações");
    }
};
const adicionarElementoTarefa = (tarefa) => {
    let notificacaoEnviada = false;
    const ne_section = document.createElement("section");
    ne_section.setAttribute("class", "cx_tarefa anima_tarefa");
    if (tarefa.completa) {
        ne_section.classList.add("completa");
    }
    const ne_h3_tt_tarefa = document.createElement("h3");
    ne_h3_tt_tarefa.setAttribute("class", "titulo_tarefa");
    const span_data_hora = document.createElement("span");
    span_data_hora.setAttribute("class", "data_hora_tarefa");
    const ne_bt_remove = document.createElement("button");
    ne_bt_remove.setAttribute("class", "st_bts_tarefas bt_remo");
    const ne_bt_complta = document.createElement("button");
    ne_bt_complta.setAttribute("class", "st_bts_tarefas bt_completa");
    const ne_bt_edt = document.createElement("button");
    ne_bt_edt.setAttribute("class", "st_bts_tarefas bt_edt");
    const ne_bt_edt_dt_hr = document.createElement("button");
    ne_bt_edt_dt_hr.setAttribute("class", "st_bts_tarefas bt_edt_dt_hr");
    const ne_ic_remo = document.createElement("i");
    ne_ic_remo.setAttribute("class", "bi bi-trash3");
    ne_bt_remove.appendChild(ne_ic_remo);
    const ne_ic_complta = document.createElement("i");
    ne_ic_complta.setAttribute("class", "bi bi-clipboard2-check-fill");
    ne_bt_complta.appendChild(ne_ic_complta);
    const ne_ic_edt = document.createElement("i");
    ne_ic_edt.setAttribute("class", "bi bi-pencil-square");
    ne_bt_edt.appendChild(ne_ic_edt);
    const ne_ic_edt_dt_hr = document.createElement("i");
    ne_ic_edt_dt_hr.setAttribute("class", "bi bi-alarm");
    ne_bt_edt_dt_hr.appendChild(ne_ic_edt_dt_hr);
    ne_h3_tt_tarefa.textContent = tarefa.titulo;
    span_data_hora.textContent = ` (${tarefa.hora} - ${tarefa.data})`;
    ne_h3_tt_tarefa.appendChild(span_data_hora);
    ne_section.append(ne_h3_tt_tarefa, ne_bt_remove, ne_bt_complta, ne_bt_edt, ne_bt_edt_dt_hr);
    tarefas.appendChild(ne_section);
    const agendarNotificacao = (titulo, descricao, diferenca, tarefaCompleta) => {
        if (!notificacaoEnviada && tarefaCompleta) {
            notificacaoEnviada = true;
            descricao = `Sua tarefa: ${ne_h3_tt_tarefa.textContent}, já está completa!`;
            new Notification(titulo, {
                body: descricao,
                icon: "icon/ic.svg"
            });
            return;
        }
        if (diferenca > 0 && !notificacaoEnviada) {
            notificacaoEnviada = true;
            setTimeout(() => {
                chama_notificacao(titulo, descricao);
            }, diferenca);
        }
        else if (diferenca <= 0) {
            console.error("Tarefa passou do prazo");
        }
    };
    const dataHoraTarefa = new Date(`${tarefa.data}T${tarefa.hora}`).getTime() - Date.now();
    agendarNotificacao(ne_h3_tt_tarefa.textContent, `Você já concluiu sua tarefa: ${ne_h3_tt_tarefa.textContent}?`, dataHoraTarefa, tarefa.completa);
    ne_bt_complta.addEventListener("click", () => {
        tarefa.completa = !tarefa.completa;
        ne_section.classList.add("completa");
        localStorage.setItem("Tarefas", JSON.stringify(array_tarefas));
    });
    bt_edt_envia.replaceWith(bt_edt_envia.cloneNode(true));
    ne_bt_edt.addEventListener("click", () => {
        inp_edit.value = tarefa.titulo;
        cx_dialog_edt.showModal();
        bt_edt_envia.addEventListener("click", () => {
            if (inp_edit.value.trim() !== "") {
                tarefa.titulo = inp_edit.value;
                ne_h3_tt_tarefa.textContent = tarefa.titulo;
                ne_h3_tt_tarefa.appendChild(span_data_hora);
                localStorage.setItem("Tarefas", JSON.stringify(array_tarefas));
                cx_dialog_edt.close();
            }
        });
        bt_cancelar.addEventListener("click", () => {
            cx_dialog_edt.close();
        });
    });
    ne_bt_edt_dt_hr.addEventListener("click", () => {
        inp_data_edt.value = tarefa.data;
        inp_horas_edt.value = tarefa.hora;
        cx_dialog_edt_hr_dt.showModal();
        requestAnimationFrame(() => {
            cx_dialog_edt_hr_dt.classList.add("show");
        });
        bt_edt_envia_hr_dt.addEventListener("click", () => {
            if (inp_data_edt.value.trim() !== "" && inp_horas_edt.value.trim() !== "") {
                tarefa.data = inp_data_edt.value;
                tarefa.hora = inp_horas_edt.value;
                span_data_hora.textContent = ` (${tarefa.hora} - ${tarefa.data})`;
                localStorage.setItem("Tarefas", JSON.stringify(array_tarefas));
                cx_dialog_edt_hr_dt.close();
            }
        });
        bt_cancelar_hr_dt.addEventListener("click", () => {
            cx_dialog_edt_hr_dt.close();
        });
    });
    ne_bt_remove.addEventListener("click", () => {
        tarefas.removeChild(ne_section);
        array_tarefas = array_tarefas.filter((t) => !(t.titulo === tarefa.titulo && t.hora === tarefa.hora && t.data === tarefa.data));
        localStorage.setItem("Tarefas", JSON.stringify(array_tarefas));
    });
    bt_pesquisar.addEventListener("click", () => {
        const tarefa_pesquisada = inp_pesq.value.trim().toLowerCase();
        const tarefa_filtrada = array_tarefas.filter((f) => {
            return f.titulo.toLowerCase().includes(tarefa_pesquisada);
        });
        tarefas.innerHTML = "";
        tarefa_filtrada.forEach((e) => {
            adicionarElementoTarefa(e);
        });
    });
    inp_pesq.addEventListener("input", () => {
        tarefas.innerHTML = "";
        array_tarefas
            .filter(t => t.titulo.toLowerCase().includes(inp_pesq.value.trim().toLowerCase()))
            .forEach(adicionarElementoTarefa);
    });
    menu_opcoes.addEventListener("change", () => {
        tarefas.innerHTML = "";
        const tarefas_filtradas = array_tarefas.filter(tarefa => {
            if (todas_tarefas.selected)
                return true;
            if (tarefas_completas.selected)
                return tarefa.completa;
            if (tarefas_incompletas.selected)
                return !tarefa.completa;
        });
        tarefas_filtradas.forEach(adicionarElementoTarefa);
    });
};

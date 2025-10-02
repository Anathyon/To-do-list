// Imports e referências atualizadas
import { background_img_unsplash } from "./api.js"

if (Notification.permission === "default") {
     Notification.requestPermission()
}

// Chamar a função de fundo
background_img_unsplash()

// Elementos da Adição de Tarefa
const tarefas = document.querySelector("#tarefas") as HTMLElement
const form_princ = document.querySelector("#form_princ") as HTMLFormElement
const inp_tarefa = document.querySelector("#inp_tarefa") as HTMLInputElement
const inp_horas = document.querySelector("#inp_horas") as HTMLInputElement
const inp_data = document.querySelector("#inp_data") as HTMLInputElement
const bt_adicionar = document.querySelector("#bt_adicionar") as HTMLButtonElement

// Elementos de Edição (mantidos)
const cx_dialog_edt = document.querySelector("#cx_dialog_edt") as HTMLDialogElement
const bt_edt_envia = document.querySelector("#bt_edt_envia") as HTMLButtonElement
const bt_cancelar = document.querySelector("#bt_cancelar") as HTMLButtonElement
const form_edit = document.querySelector("#form_edit") as HTMLFormElement
const inp_edit = document.querySelector("#inp_edit") as HTMLInputElement

const cx_dialog_edt_hr_dt = document.querySelector("#cx_dialog_edt_hr_dt") as HTMLDialogElement
const bt_edt_envia_hr_dt = document.querySelector("#bt_edt_envia_hr_dt") as HTMLButtonElement
const bt_cancelar_hr_dt = document.querySelector("#bt_cancelar_hr_dt") as HTMLButtonElement
const inp_data_edt = document.querySelector("#inp_data_edt") as HTMLInputElement
const inp_horas_edt = document.querySelector("#inp_horas_edt") as HTMLInputElement

// Elementos de Pesquisa
const pesq = document.querySelector("#pesq") as HTMLFormElement
const inp_pesq = document.querySelector("#inp_pesq") as HTMLInputElement
const bt_pesquisar = document.querySelector("#bt_pesquisar") as HTMLButtonElement  

// Elementos de Filtro (Botões substituem o select)
const filter_buttons = document.querySelectorAll(".filter_btn")
const no_tasks_message = document.querySelector("#no_tasks_message") as HTMLElement

let array_tarefas: { titulo: string; hora: string; data: string; completa: boolean; }[] = []

// Função para atualizar as estatísticas no painel
const updateStats = () => {
    const total = array_tarefas.length
    const completed = array_tarefas.filter(t => t.completa).length
    
    // Contagem de tarefas nas próximas 24h
    const now = Date.now()
    const tomorrow = now + 24 * 60 * 60 * 1000 
    const upcoming = array_tarefas.filter(t => {
        const taskDate = new Date(`${t.data}T${t.hora}`).getTime()
        return !t.completa && taskDate > now && taskDate < tomorrow
    }).length

    ;(document.querySelector("#total_tasks") as HTMLElement).textContent = total.toString()
    ;(document.querySelector("#completed_tasks") as HTMLElement).textContent = completed.toString()
    ;(document.querySelector("#upcoming_tasks") as HTMLElement).textContent = upcoming.toString()
}

document.addEventListener("DOMContentLoaded", () => {
    const tarefasSalvas = localStorage.getItem("Tarefas");
    if (tarefasSalvas) {
        array_tarefas = JSON.parse(tarefasSalvas)
        array_tarefas.forEach((tarefa) => adicionarElementoTarefa(tarefa))
    }
    updateStats()
})

form_edit.addEventListener("submit", (e) => {
    e.preventDefault()
})
form_princ.addEventListener("submit", (e) => {
    e.preventDefault()
})
pesq.addEventListener("submit", (e) => {
    e.preventDefault()
})

bt_adicionar.addEventListener("click", () => {
    if (inp_tarefa.value.trim() === "") {
        alert("Você não pode adicionar uma tarefa sem título!")
        return
    }
    // Apenas alerte se data E hora não forem preenchidas. O usuário pode querer apenas uma data, mas o seu HTML exige as duas.
    if (inp_data.value.trim() === "" || inp_horas.value.trim() === "") {
        alert("Você não pode adicionar uma tarefa sem data ou hora!")
        return
    }

    const novaTarefa = {
        titulo: inp_tarefa.value,
        hora: inp_horas.value,
        data: inp_data.value,
        completa: false
    }

    array_tarefas.push(novaTarefa)
    localStorage.setItem("Tarefas", JSON.stringify(array_tarefas))

    adicionarElementoTarefa(novaTarefa)

    inp_tarefa.value = ""
    inp_horas.value = ""
    inp_data.value = ""
    updateStats()
    checkNoTasksMessage()
})

const chama_notificacao = (titulo: string, descricao: string) => {
    if (Notification.permission === "granted") {
           new Notification (titulo,{
               body: descricao,
               icon: "icon/ic.svg"
           })
    }else{
         console.error("Úsuario negou permissão as notificações")
    }
}

const checkNoTasksMessage = () => {
    no_tasks_message.style.display = tarefas.children.length === 0 ? "flex" : "none";
    if (tarefas.children.length > 0 && tarefas.children[0].id === 'no_tasks_message') {
        tarefas.removeChild(no_tasks_message);
    }
    if (tarefas.children.length === 0 && !document.getElementById('no_tasks_message')) {
        tarefas.appendChild(no_tasks_message);
    }
}

const adicionarElementoTarefa = (tarefa: { titulo: string; hora: string; data: string; completa: boolean;}) => {
  
    let notificacaoEnviada = false // Variável de controle dentro do escopo da tarefa
  
    const ne_section = document.createElement("section")
    ne_section.setAttribute("class", "cx_tarefa anima_tarefa")

    if (tarefa.completa) {
     ne_section.classList.add("completa")
    }
 
    const ne_h3_tt_tarefa = document.createElement("h3")
    ne_h3_tt_tarefa.setAttribute("class", "titulo_tarefa")

    const span_data_hora = document.createElement("span")
    span_data_hora.setAttribute("class", "data_hora_tarefa")

   // Container para os botões de ação para melhor controle no layout
   const btns_container = document.createElement("div")
   btns_container.setAttribute("class", "task_btns_container")
   
    const ne_bt_remove = document.createElement("button")
    ne_bt_remove.setAttribute("class", "st_bts_tarefas bt_remo")
    ne_bt_remove.setAttribute("title", "Remover")

    const ne_bt_complta = document.createElement("button")
    ne_bt_complta.setAttribute("class", "st_bts_tarefas bt_completa")
    ne_bt_complta.setAttribute("title", "Concluir")

    const ne_bt_edt = document.createElement("button")
    ne_bt_edt.setAttribute("class", "st_bts_tarefas bt_edt")
    ne_bt_edt.setAttribute("title", "Editar Título")

    const ne_bt_edt_dt_hr = document.createElement("button")
    ne_bt_edt_dt_hr.setAttribute("class", "st_bts_tarefas bt_edt_dt_hr")
    ne_bt_edt_dt_hr.setAttribute("title", "Editar Data/Hora")

    const ne_ic_remo = document.createElement("i")
    ne_ic_remo.setAttribute("class", "bi bi-trash3")
    ne_bt_remove.appendChild(ne_ic_remo)

    const ne_ic_complta = document.createElement("i")
    ne_ic_complta.setAttribute("class", "bi bi-check-lg") // Mudei o ícone para ficar mais limpo
    ne_bt_complta.appendChild(ne_ic_complta)

    const ne_ic_edt = document.createElement("i")
    ne_ic_edt.setAttribute("class", "bi bi-pencil-square")
    ne_bt_edt.appendChild(ne_ic_edt)

    const ne_ic_edt_dt_hr = document.createElement("i")
    ne_ic_edt_dt_hr.setAttribute("class", "bi bi-clock-fill") // Mudei o ícone para ficar mais limpo
    ne_bt_edt_dt_hr.appendChild(ne_ic_edt_dt_hr)

    ne_h3_tt_tarefa.textContent = tarefa.titulo
    span_data_hora.textContent = ` (${tarefa.hora} - ${formatDate(tarefa.data)})` // Chamando função de formatação para data
  
    ne_h3_tt_tarefa.appendChild(span_data_hora)

    btns_container.append(ne_bt_edt_dt_hr, ne_bt_edt, ne_bt_complta, ne_bt_remove)
    ne_section.append(ne_h3_tt_tarefa, btns_container)
    tarefas.appendChild(ne_section)
    
    checkNoTasksMessage() // Verifica se deve mostrar a mensagem de 'sem tarefas'

    // Lógica de Notificação (Simplificada e adaptada)
    const agendarNotificacao = (titulo: string, descricao: string, diferenca: number) => {
        if (diferenca > 0 && !tarefa.completa) {
            setTimeout(() => {
                if (!tarefa.completa) { // Verifica novamente se não foi concluída
                    chama_notificacao(titulo, descricao)
                }
            }, diferenca)
        }
    }

    const dataHoraTarefa = new Date(`${tarefa.data}T${tarefa.hora}`).getTime() - Date.now()
    agendarNotificacao(`Lembrete: ${tarefa.titulo}`, `Sua tarefa está agendada para ${tarefa.hora} de ${formatDate(tarefa.data)}.`, dataHoraTarefa)


    ne_bt_complta.addEventListener("click", () => {
      tarefa.completa = !tarefa.completa
      ne_section.classList.toggle("completa");
      localStorage.setItem("Tarefas", JSON.stringify(array_tarefas))
      updateStats()
    })

    // Lógica de Edição de Título (melhorada para evitar múltiplos listeners)
    ne_bt_edt.addEventListener("click", () => {
      inp_edit.value = tarefa.titulo
      cx_dialog_edt.showModal()

      const handleEditSubmit = (e: Event) => {
          e.preventDefault()
          if (inp_edit.value.trim() !== "") {
            tarefa.titulo = inp_edit.value
            ne_h3_tt_tarefa.textContent = tarefa.titulo
            ne_h3_tt_tarefa.appendChild(span_data_hora)
            localStorage.setItem("Tarefas", JSON.stringify(array_tarefas))
            cx_dialog_edt.close()
          }
          bt_edt_envia.removeEventListener("click", handleEditSubmit)
      }

      const handleCancel = () => {
          cx_dialog_edt.close()
          bt_edt_envia.removeEventListener("click", handleEditSubmit)
          bt_cancelar.removeEventListener("click", handleCancel)
      }
      
      // Adiciona e remove listeners para garantir que o evento não se repita
      bt_edt_envia.addEventListener("click", handleEditSubmit)
      bt_cancelar.addEventListener("click", handleCancel)
    })

    // Lógica de Edição de Data/Hora (melhorada para evitar múltiplos listeners)
    ne_bt_edt_dt_hr.addEventListener("click", () => {
      inp_data_edt.value = tarefa.data
      inp_horas_edt.value = tarefa.hora
      
      cx_dialog_edt_hr_dt.showModal()

      const handleTimeDateSubmit = (e: Event) => {
          e.preventDefault()
          if (inp_data_edt.value.trim() !== "" && inp_horas_edt.value.trim() !== "") {
            tarefa.data = inp_data_edt.value
            tarefa.hora = inp_horas_edt.value
            span_data_hora.textContent = ` (${tarefa.hora} - ${formatDate(tarefa.data)})`
            localStorage.setItem("Tarefas", JSON.stringify(array_tarefas))
            cx_dialog_edt_hr_dt.close()
            updateStats()
          }
          bt_edt_envia_hr_dt.removeEventListener("click", handleTimeDateSubmit)
      }

      const handleTimeDateCancel = () => {
          cx_dialog_edt_hr_dt.close()
          bt_edt_envia_hr_dt.removeEventListener("click", handleTimeDateSubmit)
          bt_cancelar_hr_dt.removeEventListener("click", handleTimeDateCancel)
      }
      
      bt_edt_envia_hr_dt.addEventListener("click", handleTimeDateSubmit)
      bt_cancelar_hr_dt.addEventListener("click", handleTimeDateCancel)
            
    })
  
  
    ne_bt_remove.addEventListener("click", () => {
      tarefas.removeChild(ne_section)
      array_tarefas = array_tarefas.filter(
          (t) => !(t.titulo === tarefa.titulo && t.hora === tarefa.hora && t.data === tarefa.data)
      )
      localStorage.setItem("Tarefas", JSON.stringify(array_tarefas))
      updateStats()
      checkNoTasksMessage()
    })
}

// Lógica de Pesquisa (Mantida)
inp_pesq.addEventListener("input", () => {
    const searchTerm = inp_pesq.value.trim().toLowerCase();
    tarefas.innerHTML = ""
    
    const filteredAndSearchedTasks = array_tarefas
        .filter(t => t.titulo.toLowerCase().includes(searchTerm))
        
    // Aplica o filtro de status também durante a pesquisa
    const activeFilter = document.querySelector(".filter_btn.active")?.getAttribute("data-filter") || "todas"
    
    filteredAndSearchedTasks
        .filter(t => {
            if (activeFilter === "todas") return true
            if (activeFilter === "completas") return t.completa
            if (activeFilter === "incompletas") return !t.completa
            return true
        })
        .forEach(adicionarElementoTarefa)
    
    checkNoTasksMessage()
})

// Lógica de Filtro (Botões)
filter_buttons.forEach(button => {
    button.addEventListener("click", (e) => {
        const target = e.currentTarget as HTMLButtonElement
        
        // Remove 'active' de todos
        filter_buttons.forEach(btn => btn.classList.remove("active"))
        
        // Adiciona 'active' ao clicado
        target.classList.add("active")
        
        const filterValue = target.getAttribute("data-filter")

        tarefas.innerHTML = ""

        const tarefas_filtradas = array_tarefas.filter(tarefa => {
            if (filterValue === "todas") return true
            if (filterValue === "completas") return tarefa.completa
            if (filterValue === "incompletas") return !tarefa.completa
            return true
        })
        
        // Se houver termo de pesquisa, filtra também por ele
        const searchTerm = inp_pesq.value.trim().toLowerCase();
        
        tarefas_filtradas
            .filter(t => t.titulo.toLowerCase().includes(searchTerm))
            .forEach(adicionarElementoTarefa)
        
        checkNoTasksMessage()
    })
})

// Função auxiliar para formatar a data (opcional, mas melhora a visualização)
const formatDate = (dateString: string): string => {
    const parts = dateString.split('-');
    if (parts.length === 3) {
        return `${parts[2]}/${parts[1]}/${parts[0]}`; // Formato dd/mm/aaaa
    }
    return dateString;
}

// Coloque esta linha na função adicionarElementoTarefa:
// span_data_hora.textContent = ` (${tarefa.hora} - ${formatDate(tarefa.data)})`
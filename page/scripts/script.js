const BASE_URL = "http://127.0.0.1:8000";
var lista_ids_brinquedos = []
let ids_selecionados = document.querySelector(".Ids_selecionados")
let Brinquedos_bd = async () => {
    try {
        const RESPONSE_BRINQUEDOS = await fetch(BASE_URL + "/brinquedo", { mode: 'cors' });
        const TODOS_BRINQUEDOS = await RESPONSE_BRINQUEDOS.json();
        const div_geral_brinquedos = document.querySelector(".Brinquedos")

        for (let id =0; id < TODOS_BRINQUEDOS.length; id++ ){


            const div_atualizacao_delete_add = document.createElement("div")
            div_atualizacao_delete_add.className = "att_del"

            const botao_delete = document.createElement("button")
            botao_delete.className ="botao_del"
            botao_delete.innerText = "Apagar"
        
            const botao_att = document.createElement("button")
            botao_att.className = "botao_att"
            botao_att.innerText = "Atualizar"

            const botao_add_venda = document.createElement("button")
            botao_add_venda.className = "botao_add_venda"
            botao_add_venda.innerText = "Adicionar a venda"

            botao_add_venda.addEventListener("click",()=>Adicionar_brinquedo_venda(TODOS_BRINQUEDOS[id].id))


            botao_delete.addEventListener("click", async ()=>deletar_brinquedo(TODOS_BRINQUEDOS[id].id))



           

            div_atualizacao_delete_add.appendChild(botao_add_venda)
            div_atualizacao_delete_add.appendChild(botao_att)
            div_atualizacao_delete_add.appendChild(botao_delete)
            


            let div_brinquedo = document.createElement("div")
            div_brinquedo.className  = 'brinquedo'

            let div_componentes_brinquedo = document.createElement("div")
            div_componentes_brinquedo.className = "componentes_brinq"
            

            let Preco = document.createElement("p")
            Preco.innerText =  "Preco: " + TODOS_BRINQUEDOS[id].Preco + " R$"
            Preco.className = "Preco"

            

            let brinquedo_name  = document.createElement("h3")
            brinquedo_name.innerText = TODOS_BRINQUEDOS[id].Brinquedo
            brinquedo_name.className = "Nome"


            let Descricao_brinquedo =  document.createElement("p")
            Descricao_brinquedo.innerText = TODOS_BRINQUEDOS[id].Descricao
            Descricao_brinquedo.className ="Descricao"

            let Quantidade_brinquedo =  document.createElement("p")
            Quantidade_brinquedo.innerText = "Quantidade: " +TODOS_BRINQUEDOS[id].Quantidade
            Quantidade_brinquedo.className ="Quantidade"    

            botao_att.addEventListener("click", async ()=>atualizar_brinquedo(TODOS_BRINQUEDOS[id].id,TODOS_BRINQUEDOS[id].Brinquedo, TODOS_BRINQUEDOS[id].Descricao,TODOS_BRINQUEDOS[id].Preco,TODOS_BRINQUEDOS[id].Quantidade ) )
            
            div_componentes_brinquedo.appendChild(brinquedo_name)
            div_componentes_brinquedo.appendChild(Descricao_brinquedo)
            div_componentes_brinquedo.appendChild(Preco)
            
            div_componentes_brinquedo.appendChild(Quantidade_brinquedo)
            
            div_brinquedo.appendChild(div_componentes_brinquedo)
            div_brinquedo.appendChild(div_atualizacao_delete_add)
            
            div_geral_brinquedos.appendChild(div_brinquedo)


        }

    } catch (error) {

        console.error("Error fetching data:", error);
    }
};

let Vendas_bd = async () =>{
    const RESPONSE_VENDAS = await fetch(BASE_URL + "/vendas", { mode: 'cors' });
    const TODAS_VENDAS = await RESPONSE_VENDAS.json();
    const div_geral_vendas = document.querySelector(".Vendas")    
    let tabela_venda = document.createElement("table")
    let  head_tabela_vendas  = document.createElement("thead")

    let espaco_colunas =  document.createElement("tr")
    let coluna_id_venda = document.createElement("th")
    coluna_id_venda.innerText = "ID venda"
    let coluna_Preco = document.createElement("th")
    coluna_Preco.innerText = "Preço Pago"
    let coluna_data_venda = document.createElement("th")
    coluna_data_venda.innerText = "Data venda"
    let coluna_ids_brinquedo = document.createElement("th")
    coluna_ids_brinquedo.innerText = "IDs brinquedos"

    espaco_colunas.appendChild(coluna_id_venda)
    espaco_colunas.appendChild(coluna_data_venda)
    espaco_colunas.appendChild(coluna_ids_brinquedo)
    espaco_colunas.appendChild(coluna_Preco)
    


    head_tabela_vendas.appendChild(espaco_colunas)
    tabela_venda.appendChild(head_tabela_vendas)

    let corpo_valores = document.createElement("tbody")

    for (let id =0; id < TODAS_VENDAS.length; id++ ){


        


        let linha = document.createElement("tr")
        let linha_Id_venda = document.createElement("th")
        linha_Id_venda.innerText = TODAS_VENDAS[id].id
        linha.appendChild(linha_Id_venda)

        let linha_Data_venda = document.createElement("th")
        linha_Data_venda.innerText = TODAS_VENDAS[id].Data
        linha.appendChild(linha_Data_venda)

        let linha_ids_brinquedos = document.createElement("th")
        linha_ids_brinquedos.innerText = TODAS_VENDAS[id].Brinquedos_id
        linha.appendChild(linha_ids_brinquedos)

        let linha_preco = document.createElement("th")
        linha_preco.innerText = TODAS_VENDAS[id].Valor + "R$"
        linha.appendChild(linha_preco)

        corpo_valores.appendChild(linha)

    }
    tabela_venda.appendChild(corpo_valores)
    div_geral_vendas.appendChild(tabela_venda)
};

document.querySelector("#Form_New_Brinquedo").addEventListener("submit", async(event)=>{
    event.preventDefault()
    let Nome_brinquedo = document.querySelector("#Input_brinquedo")
    let Preco = document.querySelector("#Input_valor_brinquedo")
    let Quantidade = document.querySelector("#Input_Quantidade")
    let Descricao = document.querySelector("#Input_Descricao")
    if (Nome_brinquedo.value == ""){
        alert("Nome do brinquedo não preenchida")
    }
    else if (Preco.value == ""){
        alert("Preço não preenchida")
    }
    else if (Quantidade.value == ""){
        alert("Quantidade não preenchida")
    }
    else if (Descricao.value == ""){
        alert("Descricao não preenchida")
    }
    else {
        let New_brinquedo = 
        {
          "Brinquedo": Nome_brinquedo.value,
          "Descricao": Descricao.value,
          "Preco": Preco.value,
          "Quantidade": Quantidade.value
        }

        const RESPONSE_CREATE_BRINQUEDO = await fetch(BASE_URL + "/brinquedo", {
            method: "POST",
            mode: "cors",
            headers: {
                'Content-Type': 'application/json', 
            },
            body: JSON.stringify(New_brinquedo) 
        });
    }

})

document.querySelector("#limpar_ids").addEventListener("click",()=>{
    ids_selecionados.innerText = "."
})

let Adicionar_brinquedo_venda = (id)=>{
    lista_ids_brinquedos.push(id)
    ids_selecionados.innerText = lista_ids_brinquedos
    
}

let deletar_brinquedo = async(id) =>{
    const RESPONSE_DEL_BRINQUEDOS = await fetch(BASE_URL + "/brinquedo/"+id, {method: "DELETE", mode: 'cors' });
    const DEL_BRINQ = await RESPONSE_DEL_BRINQUEDOS.json();
    console.log(DEL_BRINQ['response'])
}

let atualizar_brinquedo = async (id, nome_atual, descricao_atual, preco_atual, quantidade_atual) => {

    let dialog_att = document.createElement("dialog");
    dialog_att.id = "Dialog_att";

    let form_att = document.createElement("form");
    form_att.method = "dialog";


    let menu_att = document.createElement("menu");
    menu_att.id = "menu_itens";

    let label_descricao = document.createElement("h2")
    label_descricao.innerText = "Atualizar valores"

    let input_novo_nome = document.createElement("input")
    input_novo_nome.type = "text"
    input_novo_nome.value = nome_atual
    input_novo_nome.className = "novo_nome"


    let input_nova_descricao = document.createElement("textarea")
    input_nova_descricao.type = "text"
    input_nova_descricao.rows = "4"
    input_nova_descricao.value = descricao_atual
    input_nova_descricao.className = "nova_descricao"

    let input_novo_preco = document.createElement("input")
    input_novo_preco.type = "Number"
    input_novo_preco.value = preco_atual
    input_novo_preco.className = "novo_preco"

    let input_nova_quantidade = document.createElement("input")
    input_nova_quantidade.type = "Number"
    input_nova_quantidade.value = quantidade_atual
    input_nova_quantidade.className= "nova_quantidade"

    let botao_cancelar_att = document.createElement("button");
    botao_cancelar_att.type = "reset";
    botao_cancelar_att.innerText = "Cancelar";
    botao_cancelar_att.className ="botoes";

    let botao_submit_att = document.createElement("button");
    botao_submit_att.type = "submit";
    botao_submit_att.innerText = "Confirmar";
    botao_submit_att.className ="botoes";


    menu_att.appendChild(label_descricao)
    menu_att.appendChild(input_novo_nome);
    menu_att.appendChild(input_nova_descricao);
    menu_att.appendChild(input_novo_preco);
    menu_att.appendChild(input_nova_quantidade);
    menu_att.appendChild(botao_cancelar_att);   
    menu_att.appendChild(botao_submit_att);

    form_att.appendChild(menu_att);
    dialog_att.appendChild(form_att);


    botao_cancelar_att.addEventListener("click", function () {
        dialog_att.close();
    });

    botao_submit_att.addEventListener("click",async(event)=>{
        event.preventDefault()
        let novo_nome = document.querySelector(".novo_nome")
        let nova_descricao = document.querySelector(".nova_descricao")
        let novo_preco = document.querySelector(".novo_preco")
        let nova_quantidade = document.querySelector(".nova_quantidade")
        let New_BRINQUEDO = 
        {
          "Brinquedo": novo_nome.value,
          "Descricao": nova_descricao.value,
          "Preco": novo_preco.value,
          "Quantidade": nova_quantidade.value
        }

        const RESPONSE_ATT_BRINQ = await fetch(BASE_URL + "/brinquedo/"+id, {
            method: "PUT",
            mode: "cors",
            headers: {
                'Content-Type': 'application/json', 
            },
            body: JSON.stringify(New_BRINQUEDO) 
        });
        dialog_att.close()
    } )
    document.body.appendChild(dialog_att);


    dialog_att.showModal();
};

document.querySelector("#Botao_submit_nova_venda").addEventListener("click", async (e) => {
    e.preventDefault();

    let data = document.querySelector("#Input_data");
    if (lista_ids_brinquedos.length === 0) {
        alert("Brinquedos não selecionados para venda");
    } else if (data.value === "") {
        alert("Data não preenchida");
    } else {
        let lista_data = data.value.split("-");
        let nova_data_formatada = lista_data[2] + "/" + lista_data[1] + "/" + lista_data[0];
        let New_venda = {
            "Brinquedos_id": lista_ids_brinquedos,
            "Data": nova_data_formatada
        };

        const RESPONSE_CREATE_VENDA = await fetch(BASE_URL + "/Venda", {
            method: "POST",
            mode: "cors",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(New_venda)
        });

        if (RESPONSE_CREATE_VENDA.ok) {
            console.log("Venda criada com sucesso!");
            // Aqui você pode adicionar lógica adicional após a criação bem-sucedida da venda
        } else {
            console.error("Erro na solicitação:", RESPONSE_CREATE_VENDA.status, RESPONSE_CREATE_VENDA.statusText);
        }
    }
});

document.addEventListener("DOMContentLoaded", function () {
    Brinquedos_bd();
    Vendas_bd();
});

function dataAtual() {
    const data_hoje = new Date();
    let ANO = data_hoje.getFullYear();
    let MES = data_hoje.getMonth() + 1;
    MES = MES < 10 ? '0' + MES : MES;
    let DIA = data_hoje.getDate();
    DIA = DIA < 10 ? '0' + DIA : DIA;
    return `${ANO}-${MES}-${DIA}`;
}

document.getElementById('Input_data').setAttribute('min', dataAtual());


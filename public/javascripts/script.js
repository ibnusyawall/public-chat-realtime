$(document).ready(function() {
          eruda.init()
          var socket = io()

          let nama_ = localStorage.getItem('nama_')
          let pesan = $('textarea#pesan')

          let pesan_box = $('#card-pesan')
          let starter = $('#starter')
          let gabung = $('#gabung')
          let nama = $('#nama')
          let sent = $('#sent')

          pesan_box.hide()

          if (nama_) {
              show_pesan_box()
              showMessages()
          }

          gabung.on('click', () => {
              name_added(nama.val())
              showMessages()
              show_pesan_box()
          })

          sent.on('click', () => {
              let data_ = { nama: nama_, pesan: pesan.val() }
              console.log(data_)
              axios.post('/api/message', data_)
                  .then(({ data }) => {
                      pesan.val('')
                  })
                  .catch(e => console.log(e))
          })

          function name_added(nama) {
              localStorage.setItem('nama_', nama)
              window.location.reload()
          }

          function show_pesan_box() {
              pesan_box.show()
              starter.hide()
          }

          function addMessage(message) {
              let html = `<div class="d-flex flex-row p-3">
                          <img src="https://img.icons8.com/color/48/000000/circled-user-male-skin-type-7.png" width="30" height="30">                                   <div class="chat ml-2 p-3">
                          <b>${toHTMLEntities(message.nama)}: </b><br/><br/>${toHTMLEntities(message.pesan)}
                       </div>
                   </div>`
              $('#pesan').append(html)
          }

          function toHTMLEntities(str, showInHtml = false) {
              return [...str].map( v => `${showInHtml ? `&amp;#` : `&#`}${v.charCodeAt(0)};`).join``
          }

          function showMessages() {
              axios('/api/messages')
                  .then(({ data }) => {
                      let { rows } = data
                      rows.map(v => addMessage(v))
                  })
          }


          $('button').on('click', () => {
              console.log('clicked')
              socket.emit('click', { ok: true })
              socket.on('oke', ({ sip }) => {
                  console.log('oke', sip)
              })
          })
          socket.on('open:test', res => {
              console.log(res)
          })

          socket.on('message:sent', ({ data }) => {
              addMessage(data)
          })
})

var waypoint_change_cb = null

export function init(cb) {
    waypoint_change_cb = cb
    $$('button').forEach(function (el) {
        el.on('click', waypoint_onclick)
    })
}
function waypoint_onclick(ev){
    waypoint_change_cb(ev.target.dataset['waypoint'])
}

export function hide_ui(){
    $('.ui').classList.add('hidden')
}

export function show_generic_error(){
    $id('generic-error').classList.remove('hidden')
}

export function show_webgl_error(){
    $id('no-webgl').classList.remove('hidden')
}

let source_lookat = null,
    source_position = null,
    cur_lookat = null,
    cur_position = null,
    destination_lookat = null,
    destination_position = null,
    duration = 0,
    current_time = 0,
    progress = 1


export function start_move(camera, dest_position, dest_lookat, _duration) {
    if (!source_lookat) {
        source_lookat = dest_lookat.clone()
    } else {
        source_lookat = cur_lookat.clone()
    }
    cur_lookat = source_lookat.clone()
    source_position = camera.position.clone()
    cur_position = source_position.clone()
    destination_lookat = dest_lookat
    destination_position = dest_position.clone()
    destination_position.y += 1
    progress = 0
    duration = _duration
    current_time = 0
}

function easeInOutQuad(p) {
    if (p < 0.5) {
        return 2*p*p
    } else {
        return -1 + (4 - 2*p)*p
    }
}

export function continue_move(camera, dt) {
    current_time += dt
    progress = current_time / duration
    progress = Math.min(1, progress)

    progress = easeInOutQuad(progress)

    cur_position.copy(source_position)
    cur_position.lerp(destination_position, progress)

    cur_lookat.copy(source_lookat)
    cur_lookat.lerp(destination_lookat, progress)

    camera.position.copy(cur_position)
    camera.lookAt(cur_lookat)

    if (progress == 1) {
        source_lookat.copy(destination_lookat)
    }

    return progress < 1
}

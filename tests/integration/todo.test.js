import { describe, it, expect, beforeEach } from 'vitest';
import {
  crearTareaElemento,
  agregarTarea,
  eliminarTarea,
  alternarTarea,
  limpiarCompletadas,
  actualizarContador,
  mostrarError,
} from '../../src/js/dom/todo.js';

// Helper: crea una lista <ul> fresca para cada prueba
function crearLista() {
  return document.createElement('ul');
}

// ============================================================
// Pruebas de integración — manipulación del DOM
// ============================================================
describe('crearTareaElemento', () => {
  it('debe crear un elemento <li> con la clase "tarea-item"', () => {
    const li = crearTareaElemento('Test');
    expect(li.tagName).toBe('LI');
    expect(li.classList.contains('tarea-item')).toBe(true);
  });

  
});

describe('agregarTarea', () => {
  let lista;

  beforeEach(() => {
    lista = crearLista();
  });

  it('debe agregar un <li> a la lista cuando el texto es válido', () => {
    const resultado = agregarTarea('Aprender vitest', lista);
    expect(resultado.exito).toBe(true);
    expect(lista.children.length).toBe(1);
    expect(lista.querySelector('.tarea-texto').textContent).toBe('Aprender vitest');
  });
    it('debe formatear el texto antes de agregarlo(pri. may. sigu min', () => {
        agregarTarea("esTUdiar VERiFiCACion SW",lista)
        const span = lista.querySelector('.tarea-texto')
        expect(span.textContent).toBe("Estudiar verificacion sw")
    });
  
});

describe('eliminarTarea', () => {
  it('debe eliminar el elemento <li> del DOM', () => {
    const lista = crearLista();
    agregarTarea('Tarea a eliminar', lista);
    const li = lista.querySelector('.tarea-item');

    eliminarTarea(li);
    expect(lista.children.length).toBe(0);
  });
});

describe('alternarTarea', () => {
  it('debe agregar la clase "completada" cuando el checkbox está marcado', () => {
    const li = crearTareaElemento('Tarea test');
    const checkbox = li.querySelector('.tarea-checkbox');
    checkbox.checked = true;

    alternarTarea(li, checkbox);
    expect(li.classList.contains('completada')).toBe(true);
  });

  
});

describe('limpiarCompletadas', () => {
  it('debe eliminar solo las tareas completadas', () => {
    const lista = crearLista();
    agregarTarea('Tarea pendiente', lista);
    agregarTarea('Tarea completada', lista);

    // Marcar la segunda como completada
    const items = lista.querySelectorAll('.tarea-item');
    const checkbox = items[1].querySelector('.tarea-checkbox');
    checkbox.checked = true;
    alternarTarea(items[1], checkbox);

    const eliminadas = limpiarCompletadas(lista);
    expect(eliminadas).toBe(1);
    expect(lista.children.length).toBe(1);
    expect(lista.querySelector('.tarea-texto').textContent).toBe('Tarea pendiente');
  });

  
});

describe('actualizarContador', () => {
  it('debe mostrar "0 tareas" cuando la lista está vacía', () => {
    const lista = crearLista();
    const contenedor = document.createElement('span');

    actualizarContador(lista, contenedor);
    expect(contenedor.textContent).toBe('0 tareas');
  });

  it('debe mostrar "1 tarea" cuando hay exactamente un elemento', () => {
    const lista = crearLista();
    agregarTarea('Única tarea', lista);
    const contenedor = document.createElement('span');

    actualizarContador(lista, contenedor);
    expect(contenedor.textContent).toBe('1 tarea');
  });

  
});

describe('mostrarError', () => {
  it('debe establecer el texto del contenedor con el mensaje de error', () => {
    const contenedor = document.createElement('div');
    mostrarError('Error de prueba', contenedor);
    expect(contenedor.textContent).toBe('Error de prueba');
  });

  
});
describe('Pruebas adicionales — Tarea 2', () => {
    let lista;

    beforeEach(() => {
        lista = crearLista();
    });

    // 1. Clic en botón eliminar remueve el <li> de la lista
    it('debe eliminar el elemento al hacer clic en el botón de eliminar', () => {
        const li = crearTareaElemento('Tarea para eliminar');
        lista.appendChild(li);

        const btnEliminar = li.querySelector('.btn-eliminar');
        btnEliminar.click();

        expect(lista.children.length).toBe(0);
    });

    // 2. Evento change en checkbox alterna la clase "completada"
    it('debe alternar la clase "completada" al disparar el evento change en el checkbox', () => {
        const li = crearTareaElemento('Tarea con evento');
        lista.appendChild(li);

        const checkbox = li.querySelector('.tarea-checkbox');

        // Marcar como completada
        checkbox.checked = true;
        checkbox.dispatchEvent(new Event('change'));
        expect(li.classList.contains('completada')).toBe(true);

        // Desmarcar
        checkbox.checked = false;
        checkbox.dispatchEvent(new Event('change'));
        expect(li.classList.contains('completada')).toBe(false);
    });

    // 3. agregarTarea con texto de exactamente 200 caracteres debe ser exitoso
    it('debe aceptar un texto de exactamente 200 caracteres', () => {
        const texto = 'a'.repeat(200);
        const resultado = agregarTarea(texto, lista);

        expect(resultado.exito).toBe(true);
        expect(lista.children.length).toBe(1);
    });

    // 4. limpiarCompletadas cuando todas las tareas están completadas deja la lista vacía
    it('debe vaciar la lista cuando todas las tareas están completadas', () => {
        agregarTarea('Tarea 1', lista);
        agregarTarea('Tarea 2', lista);
        agregarTarea('Tarea 3', lista);

        lista.querySelectorAll('.tarea-item').forEach((li) => {
            const checkbox = li.querySelector('.tarea-checkbox');
            checkbox.checked = true;
            alternarTarea(li, checkbox);
        });

        const eliminadas = limpiarCompletadas(lista);

        expect(eliminadas).toBe(3);
        expect(lista.children.length).toBe(0);
    });
});

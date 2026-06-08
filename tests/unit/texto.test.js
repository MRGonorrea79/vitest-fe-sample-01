import { describe, it, expect } from 'vitest';
import { validarTexto, formatearTexto } from '../../src/js/utils/texto.js';

// ============================================================
// Pruebas unitarias para validarTexto
// ============================================================
describe('validarTexto', () => {
  // --- Casos válidos ---
  it('debe retornar válido para un texto con 3 o más caracteres', () => {
    const resultado = validarTexto('Comprar pan');
    expect(resultado.valido).toBe(true);
    expect(resultado.error).toBe('');
  });

  it('debe retornar válido para un texto con exactamente 3 caracteres', () => {
    const resultado = validarTexto('ABC');
    expect(resultado.valido).toBe(true);
  });

  it('debe retornar válido para un texto con 200 caracteres (límite)', () => {
    const texto = 'A'.repeat(200);
    const resultado = validarTexto(texto);
    expect(resultado.valido).toBe(true);
  });


});

// ============================================================
// Pruebas unitarias para formatearTexto
// ============================================================
describe('formatearTexto', () => {
  it('debe convertir la primera letra a mayúscula y el resto a minúscula', () => {
    const resultado = formatearTexto('hOLA MUNDO');
    expect(resultado).toBe('Hola mundo');
  });

  it('debe retornar un string vacío si se ingresa un string vacío', () => {
    const resultado = formatearTexto('');
    expect(resultado).toBe('');
  });

  //-- validar los casos invalidos
    it('debe retornar invalido cuando el texto esta vacio', () => {
        const resultado = validarTexto(''); //arrange-act
        expect(resultado.valido).toBe(false);//Assert
        expect(resultado.error).toContain('vacío')
    });
    //-- validar los casos invalidos
    it('debe retornar invalido cuando el texto tiene menos de tres caracteres', () => {
        const resultado = validarTexto('LO'); //arrange-act
        expect(resultado.valido).toBe(false);//Assert
        expect(resultado.error).toContain('3')
    });
    it('debe retornar invalido cuando el texto tiene menos de doscientos caracteres', () => {
        const resultado = validarTexto('LOajhdbvhjasbdvjashbvjvhdsvcjhdsvjavcaadsmbcvascvnmdsbvsndnmcvjdcvebcebhjbvejchvujevcuegvcegvchegvhegvchegcvhecvhevchvehcveghcveghcvehgvceghvcghevcghevcghevcghevcghevghcveghvcghevcghevcgevcgvegcvegcvegcvegvcgevcgcevgevcgvgcvhgwvscgvsydtcvsydvhgscvsdcshcsghcvgweyvegscvgcvgyswveyvsytcvsyevysfvvcfvscvsvcgsyvdcghvyetvhgscvwyev'); //arrange-act
        expect(resultado.valido).toBe(false);//Assert
        expect(resultado.error).toContain('200')
    });


});

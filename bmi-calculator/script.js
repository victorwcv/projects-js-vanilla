const btnEl = document.getElementById("btn");
const bmiInputEl = document.getElementById("bmi-result");
const weightConditionEl = document.getElementById("weight-condition");

function calculateBMI() {
  // Obteniendo los valores de altura y peso del documento
  const heightValue = document.getElementById("height").value / 100;
  const weightValue = document.getElementById("weight").value;

  // Verificando si se ingresaron valores de altura y peso
  if (heightValue && weightValue) {
    // Calculando el índice de masa corporal (IMC)
    const bmiValue = weightValue / (heightValue * heightValue);
    // Mostrando el valor del IMC con dos decimales en el input correspondiente
    bmiInputEl.value = bmiValue.toFixed(2);

    // Asignando una etiqueta de peso basada en el valor del IMC
    weightConditionEl.innerText =
      bmiValue < 18.5
        ? " Under weight"
        : bmiValue >= 18.5 && bmiValue <= 24.9
        ? " Normal weight"
        : bmiValue >= 25 && bmiValue <= 29.9
        ? " Overweight"
        : bmiValue >= 30
        ? " Obesity"
        : " Out of Range";
  }
}

btnEl.addEventListener("click", calculateBMI);

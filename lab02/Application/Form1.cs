using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Data;
using System.Diagnostics;
using System.Drawing;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Windows.Forms;
using static System.Windows.Forms.VisualStyles.VisualStyleElement;

namespace Lab2
{
    public partial class Form1 : Form
    {
        public Form1()
        {
            InitializeComponent();
        }
        private void btnStart_Click(object sender, EventArgs e)
        {
            double dt, t0, tl, tr, L, time, p, c, lambda, h;
            Stopwatch sw = new Stopwatch();

            dt = (double)inputDelta.Value;// Шаг по времени (Толщину делим на точность)
            h = (double)inputStep.Value; // Шаг по пространству (Толщину делим на точность)

            t0 = (double)inputStartTemp.Value;
            tl = (double)inputLeft.Value;
            tr = (double)inputRight.Value;
            L = (double)inputWidth.Value;
            time = (double)inputTime.Value;
            p = (double)inputPlot.Value; // Плотность тела(сталь)
            c = (double)inputHeat.Value; // удельная теплоемкость (стали)
            lambda = (double)inputLambda.Value; // Коэф. теплопроводности;


            int N = (int)(L / h) + 1; // Количество узлов (шаги по сетке)
            int M = (int)(time / dt); // Количество шагов по времени


            // Массивы для метода прогонки
            double[] t = new double[N];      // Текущая температура
            double[] alpha = new double[N];
            double[] beta = new double[N];

            double Ai, Ci, Bi, Fi;

            Ai = Ci = lambda / (h * h);
            Bi = 2 * lambda / (h * h) + p * c / dt;


            // Заполняем начальным значением
            for (int i = 0; i < N; i++)
            {
                t[i] = t0;
            }

            // Границы
            t[0] = tl; 
            t[t.Length - 1] = tr; 
           
            sw.Start();
            for(int step = 0; step < M; step++) //   Прямая прогонка по кол-во шагов за время
            {
                // Прямая прогонка (От первого к последнему)
                
                // Граничное условие слева для прогонки: t0 = tl
                alpha[0] = 0.0;
                beta[0] = tl;

                for (int i = 1; i < N; i++)
                {
                    alpha[i] = Ai / (Bi - Ci * alpha[i - 1]);

                    Fi = -p * c * t[i] / dt;

                    beta[i] = (Ci * beta[i - 1] - Fi) / (Bi - Ci * alpha[i - 1]);
                }

                // Обратная прогонка (От предпоследнего элемента к первому)
                for (int i = N - 2; i > 0; i--)
                {
                    t[i] = alpha[i] * t[i + 1] + beta[i];

                }

                chart1.Series[0].Points.Clear();
                for (int i = 0; i < N; i++)
                {
                    chart1.Series[0].Points.AddXY(i * h, t[i]);
                }

                chart1.ChartAreas[0].AxisX.Minimum = 0;
                chart1.ChartAreas[0].AxisX.Maximum = L;
                chart1.ChartAreas[0].AxisX.Title = "Координата x, м";
                chart1.ChartAreas[0].AxisY.Title = "Температура T, °C";
            }
            sw.Stop();

            int centerIndex = N / 2;
            double tCenter = t[centerIndex];
            double realTime = sw.Elapsed.TotalSeconds;
            dataGridResults.Rows.Add(dt, h, tCenter, realTime);
        }

        private void btnClear_Click(object sender, EventArgs e)
        {
            dataGridResults.Rows.Clear();
        }
    }
}

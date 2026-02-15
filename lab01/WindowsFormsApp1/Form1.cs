using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Data;
using System.Drawing;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Windows.Forms;

namespace WindowsFormsApp1
{
    public partial class Form1 : Form
    {
        public Form1()
        {
            InitializeComponent();
        }

        decimal t, x, y, v0, cosa, sina, dtValue, S, m, k, vx, vy;
        // Постоянные
        const decimal g = 9.81M; // Ускорение свободного падение тела
        const decimal C = 0.15M; // Коэф. лобового сопротивления
        const decimal rho = 1.29M; // плотность воздуха
        private void btnLaunch_Click(object sender, EventArgs e)
        {

            if (!timer1.Enabled)
            {

                // Очищаем нашу таблицу с результатами
                dataGridResults.Rows.Clear();
                // Очищаем наш график для повторного запуска
                chart.Series[0].Points.Clear();
                t = 0; 
                x = 0; 
                y = inputHeight.Value;
                v0 = inputSpeed.Value;


                // Точность расчета
                dtValue = (decimal)inputAccuracy.Value;

                // Переводим наш градусы угла в радианы для методов (Cos(), Sin());
                double a = (double)inputAngle.Value * Math.PI / 180;
                cosa = (decimal)Math.Cos(a);
                sina = (decimal)Math.Sin(a);

                S = inputSize.Value;
                m = inputWeight.Value;
                k = 0.5M * C * rho * S / m;
                // Расчет скорости 
                vx = v0 * cosa;
                vy = v0 * sina;

                chart.Series[0].Points.AddXY(x, y);
                timer1.Start();

            }
        }
        decimal maxHeight = 0, range, lastSpeed;
        private void timer1_Tick(object sender, EventArgs e)
        {
            // Шаг
            t = t + dtValue;

            lastSpeed = (decimal)Math.Sqrt((double)(vx * vx + vy * vy));

            // Математическая модель
            vx = vx - k * vx * lastSpeed * dtValue;
            vy = vy - (g + k * vy * lastSpeed) * dtValue;

            x = x + vx * dtValue;
            y = y + vy * dtValue;

            if (y > maxHeight) maxHeight = y;

            chart.Series[0].Points.AddXY(x, y);
            if (y <= 0) {
                timer1.Stop();
                range = x;
                dataGridResults.Rows.Add(
                    dtValue.ToString("F4"),
                    range.ToString("F2"),
                    maxHeight.ToString("F2"),
                    lastSpeed.ToString("F2")
                );
            }  
        }
    }
}

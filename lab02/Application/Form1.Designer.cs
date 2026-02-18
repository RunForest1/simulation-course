namespace Lab2
{
    partial class Form1
    {
        /// <summary>
        /// Обязательная переменная конструктора.
        /// </summary>
        private System.ComponentModel.IContainer components = null;

        /// <summary>
        /// Освободить все используемые ресурсы.
        /// </summary>
        /// <param name="disposing">истинно, если управляемый ресурс должен быть удален; иначе ложно.</param>
        protected override void Dispose(bool disposing)
        {
            if (disposing && (components != null))
            {
                components.Dispose();
            }
            base.Dispose(disposing);
        }

        #region Код, автоматически созданный конструктором форм Windows

        /// <summary>
        /// Требуемый метод для поддержки конструктора — не изменяйте 
        /// содержимое этого метода с помощью редактора кода.
        /// </summary>
        private void InitializeComponent()
        {
            System.Windows.Forms.DataVisualization.Charting.ChartArea chartArea1 = new System.Windows.Forms.DataVisualization.Charting.ChartArea();
            System.Windows.Forms.DataVisualization.Charting.Legend legend1 = new System.Windows.Forms.DataVisualization.Charting.Legend();
            System.Windows.Forms.DataVisualization.Charting.Series series1 = new System.Windows.Forms.DataVisualization.Charting.Series();
            this.panel1 = new System.Windows.Forms.Panel();
            this.inputStep = new System.Windows.Forms.NumericUpDown();
            this.label10 = new System.Windows.Forms.Label();
            this.inputLambda = new System.Windows.Forms.NumericUpDown();
            this.label9 = new System.Windows.Forms.Label();
            this.inputHeat = new System.Windows.Forms.NumericUpDown();
            this.label8 = new System.Windows.Forms.Label();
            this.inputPlot = new System.Windows.Forms.NumericUpDown();
            this.label7 = new System.Windows.Forms.Label();
            this.btnStart = new System.Windows.Forms.Button();
            this.inputTime = new System.Windows.Forms.NumericUpDown();
            this.label6 = new System.Windows.Forms.Label();
            this.inputDelta = new System.Windows.Forms.NumericUpDown();
            this.label5 = new System.Windows.Forms.Label();
            this.inputStartTemp = new System.Windows.Forms.NumericUpDown();
            this.label4 = new System.Windows.Forms.Label();
            this.inputRight = new System.Windows.Forms.NumericUpDown();
            this.label3 = new System.Windows.Forms.Label();
            this.inputLeft = new System.Windows.Forms.NumericUpDown();
            this.label2 = new System.Windows.Forms.Label();
            this.inputWidth = new System.Windows.Forms.NumericUpDown();
            this.label1 = new System.Windows.Forms.Label();
            this.btnClear = new System.Windows.Forms.Button();
            this.chart1 = new System.Windows.Forms.DataVisualization.Charting.Chart();
            this.dataGridResults = new System.Windows.Forms.DataGridView();
            this.dtValue = new System.Windows.Forms.DataGridViewTextBoxColumn();
            this.h = new System.Windows.Forms.DataGridViewTextBoxColumn();
            this.Tmiddle = new System.Windows.Forms.DataGridViewTextBoxColumn();
            this.endTime = new System.Windows.Forms.DataGridViewTextBoxColumn();
            this.panel1.SuspendLayout();
            ((System.ComponentModel.ISupportInitialize)(this.inputStep)).BeginInit();
            ((System.ComponentModel.ISupportInitialize)(this.inputLambda)).BeginInit();
            ((System.ComponentModel.ISupportInitialize)(this.inputHeat)).BeginInit();
            ((System.ComponentModel.ISupportInitialize)(this.inputPlot)).BeginInit();
            ((System.ComponentModel.ISupportInitialize)(this.inputTime)).BeginInit();
            ((System.ComponentModel.ISupportInitialize)(this.inputDelta)).BeginInit();
            ((System.ComponentModel.ISupportInitialize)(this.inputStartTemp)).BeginInit();
            ((System.ComponentModel.ISupportInitialize)(this.inputRight)).BeginInit();
            ((System.ComponentModel.ISupportInitialize)(this.inputLeft)).BeginInit();
            ((System.ComponentModel.ISupportInitialize)(this.inputWidth)).BeginInit();
            ((System.ComponentModel.ISupportInitialize)(this.chart1)).BeginInit();
            ((System.ComponentModel.ISupportInitialize)(this.dataGridResults)).BeginInit();
            this.SuspendLayout();
            // 
            // panel1
            // 
            this.panel1.BackColor = System.Drawing.SystemColors.ControlDark;
            this.panel1.Controls.Add(this.inputStep);
            this.panel1.Controls.Add(this.label10);
            this.panel1.Controls.Add(this.inputLambda);
            this.panel1.Controls.Add(this.label9);
            this.panel1.Controls.Add(this.inputHeat);
            this.panel1.Controls.Add(this.label8);
            this.panel1.Controls.Add(this.inputPlot);
            this.panel1.Controls.Add(this.label7);
            this.panel1.Controls.Add(this.btnStart);
            this.panel1.Controls.Add(this.inputTime);
            this.panel1.Controls.Add(this.label6);
            this.panel1.Controls.Add(this.inputDelta);
            this.panel1.Controls.Add(this.label5);
            this.panel1.Controls.Add(this.inputStartTemp);
            this.panel1.Controls.Add(this.label4);
            this.panel1.Controls.Add(this.inputRight);
            this.panel1.Controls.Add(this.label3);
            this.panel1.Controls.Add(this.inputLeft);
            this.panel1.Controls.Add(this.label2);
            this.panel1.Controls.Add(this.inputWidth);
            this.panel1.Controls.Add(this.label1);
            this.panel1.Location = new System.Drawing.Point(1, 1);
            this.panel1.Name = "panel1";
            this.panel1.Size = new System.Drawing.Size(185, 450);
            this.panel1.TabIndex = 0;
            // 
            // inputStep
            // 
            this.inputStep.DecimalPlaces = 4;
            this.inputStep.Increment = new decimal(new int[] {
            1,
            0,
            0,
            262144});
            this.inputStep.Location = new System.Drawing.Point(96, 211);
            this.inputStep.Maximum = new decimal(new int[] {
            1,
            0,
            0,
            0});
            this.inputStep.Minimum = new decimal(new int[] {
            1,
            0,
            0,
            262144});
            this.inputStep.Name = "inputStep";
            this.inputStep.Size = new System.Drawing.Size(65, 20);
            this.inputStep.TabIndex = 20;
            this.inputStep.Value = new decimal(new int[] {
            1,
            0,
            0,
            65536});
            // 
            // label10
            // 
            this.label10.AutoSize = true;
            this.label10.Location = new System.Drawing.Point(93, 195);
            this.label10.Name = "label10";
            this.label10.Size = new System.Drawing.Size(77, 13);
            this.label10.TabIndex = 19;
            this.label10.Text = "Шаг по прост.";
            // 
            // inputLambda
            // 
            this.inputLambda.Location = new System.Drawing.Point(14, 376);
            this.inputLambda.Name = "inputLambda";
            this.inputLambda.Size = new System.Drawing.Size(120, 20);
            this.inputLambda.TabIndex = 18;
            this.inputLambda.Value = new decimal(new int[] {
            46,
            0,
            0,
            0});
            // 
            // label9
            // 
            this.label9.AutoSize = true;
            this.label9.Location = new System.Drawing.Point(11, 360);
            this.label9.Name = "label9";
            this.label9.Size = new System.Drawing.Size(165, 13);
            this.label9.TabIndex = 17;
            this.label9.Text = "Коэф. теплопроводности, Вт/м";
            // 
            // inputHeat
            // 
            this.inputHeat.Location = new System.Drawing.Point(14, 336);
            this.inputHeat.Maximum = new decimal(new int[] {
            10000,
            0,
            0,
            0});
            this.inputHeat.Name = "inputHeat";
            this.inputHeat.Size = new System.Drawing.Size(120, 20);
            this.inputHeat.TabIndex = 16;
            this.inputHeat.Value = new decimal(new int[] {
            460,
            0,
            0,
            0});
            // 
            // label8
            // 
            this.label8.AutoSize = true;
            this.label8.Location = new System.Drawing.Point(11, 320);
            this.label8.Name = "label8";
            this.label8.Size = new System.Drawing.Size(171, 13);
            this.label8.TabIndex = 15;
            this.label8.Text = "Удельная теплоемкость, Дж/кг";
            // 
            // inputPlot
            // 
            this.inputPlot.Location = new System.Drawing.Point(14, 293);
            this.inputPlot.Maximum = new decimal(new int[] {
            10000,
            0,
            0,
            0});
            this.inputPlot.Name = "inputPlot";
            this.inputPlot.Size = new System.Drawing.Size(120, 20);
            this.inputPlot.TabIndex = 14;
            this.inputPlot.Value = new decimal(new int[] {
            7800,
            0,
            0,
            0});
            // 
            // label7
            // 
            this.label7.AutoSize = true;
            this.label7.Location = new System.Drawing.Point(11, 277);
            this.label7.Name = "label7";
            this.label7.Size = new System.Drawing.Size(129, 13);
            this.label7.TabIndex = 13;
            this.label7.Text = "Плотность тела, кг/м^3";
            // 
            // btnStart
            // 
            this.btnStart.BackColor = System.Drawing.SystemColors.ButtonHighlight;
            this.btnStart.Location = new System.Drawing.Point(13, 402);
            this.btnStart.Name = "btnStart";
            this.btnStart.Size = new System.Drawing.Size(120, 35);
            this.btnStart.TabIndex = 12;
            this.btnStart.Text = "Запуск";
            this.btnStart.UseVisualStyleBackColor = false;
            this.btnStart.Click += new System.EventHandler(this.btnStart_Click);
            // 
            // inputTime
            // 
            this.inputTime.Location = new System.Drawing.Point(14, 253);
            this.inputTime.Name = "inputTime";
            this.inputTime.Size = new System.Drawing.Size(120, 20);
            this.inputTime.TabIndex = 11;
            this.inputTime.Value = new decimal(new int[] {
            2,
            0,
            0,
            0});
            // 
            // label6
            // 
            this.label6.AutoSize = true;
            this.label6.Location = new System.Drawing.Point(11, 237);
            this.label6.Name = "label6";
            this.label6.Size = new System.Drawing.Size(52, 13);
            this.label6.TabIndex = 10;
            this.label6.Text = "Время, c";
            // 
            // inputDelta
            // 
            this.inputDelta.DecimalPlaces = 4;
            this.inputDelta.Increment = new decimal(new int[] {
            1,
            0,
            0,
            262144});
            this.inputDelta.Location = new System.Drawing.Point(13, 211);
            this.inputDelta.Maximum = new decimal(new int[] {
            1,
            0,
            0,
            0});
            this.inputDelta.Minimum = new decimal(new int[] {
            1,
            0,
            0,
            262144});
            this.inputDelta.Name = "inputDelta";
            this.inputDelta.Size = new System.Drawing.Size(65, 20);
            this.inputDelta.TabIndex = 9;
            this.inputDelta.Value = new decimal(new int[] {
            1,
            0,
            0,
            65536});
            // 
            // label5
            // 
            this.label5.AutoSize = true;
            this.label5.Location = new System.Drawing.Point(11, 195);
            this.label5.Name = "label5";
            this.label5.Size = new System.Drawing.Size(74, 13);
            this.label5.TabIndex = 8;
            this.label5.Text = "Шаг по врем.";
            // 
            // inputStartTemp
            // 
            this.inputStartTemp.Location = new System.Drawing.Point(14, 169);
            this.inputStartTemp.Maximum = new decimal(new int[] {
            1000,
            0,
            0,
            0});
            this.inputStartTemp.Minimum = new decimal(new int[] {
            1000,
            0,
            0,
            -2147483648});
            this.inputStartTemp.Name = "inputStartTemp";
            this.inputStartTemp.Size = new System.Drawing.Size(120, 20);
            this.inputStartTemp.TabIndex = 7;
            this.inputStartTemp.Value = new decimal(new int[] {
            27,
            0,
            0,
            0});
            // 
            // label4
            // 
            this.label4.AutoSize = true;
            this.label4.Location = new System.Drawing.Point(11, 153);
            this.label4.Name = "label4";
            this.label4.Size = new System.Drawing.Size(150, 13);
            this.label4.TabIndex = 6;
            this.label4.Text = "Начальная температура, °C:";
            // 
            // inputRight
            // 
            this.inputRight.Location = new System.Drawing.Point(14, 123);
            this.inputRight.Maximum = new decimal(new int[] {
            1000,
            0,
            0,
            0});
            this.inputRight.Minimum = new decimal(new int[] {
            1000,
            0,
            0,
            -2147483648});
            this.inputRight.Name = "inputRight";
            this.inputRight.Size = new System.Drawing.Size(120, 20);
            this.inputRight.TabIndex = 5;
            this.inputRight.Value = new decimal(new int[] {
            27,
            0,
            0,
            0});
            // 
            // label3
            // 
            this.label3.AutoSize = true;
            this.label3.Location = new System.Drawing.Point(11, 107);
            this.label3.Name = "label3";
            this.label3.Size = new System.Drawing.Size(133, 13);
            this.label3.TabIndex = 4;
            this.label3.Text = "Температура справа, °C:";
            // 
            // inputLeft
            // 
            this.inputLeft.Location = new System.Drawing.Point(14, 75);
            this.inputLeft.Maximum = new decimal(new int[] {
            1000,
            0,
            0,
            0});
            this.inputLeft.Minimum = new decimal(new int[] {
            1000,
            0,
            0,
            -2147483648});
            this.inputLeft.Name = "inputLeft";
            this.inputLeft.Size = new System.Drawing.Size(120, 20);
            this.inputLeft.TabIndex = 3;
            this.inputLeft.Value = new decimal(new int[] {
            30,
            0,
            0,
            -2147483648});
            // 
            // label2
            // 
            this.label2.AutoSize = true;
            this.label2.Location = new System.Drawing.Point(11, 59);
            this.label2.Name = "label2";
            this.label2.Size = new System.Drawing.Size(127, 13);
            this.label2.TabIndex = 2;
            this.label2.Text = "Температура слева, °C:";
            // 
            // inputWidth
            // 
            this.inputWidth.DecimalPlaces = 3;
            this.inputWidth.Increment = new decimal(new int[] {
            1,
            0,
            0,
            196608});
            this.inputWidth.Location = new System.Drawing.Point(14, 33);
            this.inputWidth.Minimum = new decimal(new int[] {
            1,
            0,
            0,
            196608});
            this.inputWidth.Name = "inputWidth";
            this.inputWidth.Size = new System.Drawing.Size(120, 20);
            this.inputWidth.TabIndex = 1;
            this.inputWidth.Value = new decimal(new int[] {
            1,
            0,
            0,
            65536});
            // 
            // label1
            // 
            this.label1.AutoSize = true;
            this.label1.Location = new System.Drawing.Point(11, 17);
            this.label1.Name = "label1";
            this.label1.Size = new System.Drawing.Size(122, 13);
            this.label1.TabIndex = 0;
            this.label1.Text = "Толщина пластины, м:";
            // 
            // btnClear
            // 
            this.btnClear.BackColor = System.Drawing.SystemColors.ButtonHighlight;
            this.btnClear.Location = new System.Drawing.Point(668, 390);
            this.btnClear.Name = "btnClear";
            this.btnClear.Size = new System.Drawing.Size(120, 35);
            this.btnClear.TabIndex = 13;
            this.btnClear.Text = "Очистить графики";
            this.btnClear.UseVisualStyleBackColor = false;
            this.btnClear.Click += new System.EventHandler(this.btnClear_Click);
            // 
            // chart1
            // 
            this.chart1.BackColor = System.Drawing.Color.WhiteSmoke;
            chartArea1.AxisX.Maximum = 30D;
            chartArea1.AxisX.Minimum = 0D;
            chartArea1.AxisY.Maximum = 100D;
            chartArea1.AxisY.Minimum = -100D;
            chartArea1.Name = "ChartArea1";
            this.chart1.ChartAreas.Add(chartArea1);
            legend1.Name = "Legend1";
            this.chart1.Legends.Add(legend1);
            this.chart1.Location = new System.Drawing.Point(194, 102);
            this.chart1.Name = "chart1";
            series1.ChartArea = "ChartArea1";
            series1.ChartType = System.Windows.Forms.DataVisualization.Charting.SeriesChartType.Line;
            series1.Legend = "Legend1";
            series1.Name = "Series1";
            this.chart1.Series.Add(series1);
            this.chart1.Size = new System.Drawing.Size(604, 348);
            this.chart1.TabIndex = 1;
            this.chart1.Text = "chart1";
            // 
            // dataGridResults
            // 
            this.dataGridResults.ColumnHeadersHeightSizeMode = System.Windows.Forms.DataGridViewColumnHeadersHeightSizeMode.AutoSize;
            this.dataGridResults.Columns.AddRange(new System.Windows.Forms.DataGridViewColumn[] {
            this.dtValue,
            this.h,
            this.Tmiddle,
            this.endTime});
            this.dataGridResults.Location = new System.Drawing.Point(194, 1);
            this.dataGridResults.Name = "dataGridResults";
            this.dataGridResults.Size = new System.Drawing.Size(461, 95);
            this.dataGridResults.TabIndex = 14;
            // 
            // dtValue
            // 
            this.dtValue.HeaderText = "Шаг по пространству";
            this.dtValue.Name = "dtValue";
            // 
            // h
            // 
            this.h.HeaderText = "Шаг по времени";
            this.h.Name = "h";
            // 
            // Tmiddle
            // 
            this.Tmiddle.HeaderText = "Температура в центральной точке";
            this.Tmiddle.Name = "Tmiddle";
            // 
            // endTime
            // 
            this.endTime.HeaderText = "Время выполнения";
            this.endTime.Name = "endTime";
            // 
            // Form1
            // 
            this.AutoScaleDimensions = new System.Drawing.SizeF(6F, 13F);
            this.AutoScaleMode = System.Windows.Forms.AutoScaleMode.Font;
            this.ClientSize = new System.Drawing.Size(800, 450);
            this.Controls.Add(this.dataGridResults);
            this.Controls.Add(this.btnClear);
            this.Controls.Add(this.chart1);
            this.Controls.Add(this.panel1);
            this.Name = "Form1";
            this.Text = "Form1";
            this.panel1.ResumeLayout(false);
            this.panel1.PerformLayout();
            ((System.ComponentModel.ISupportInitialize)(this.inputStep)).EndInit();
            ((System.ComponentModel.ISupportInitialize)(this.inputLambda)).EndInit();
            ((System.ComponentModel.ISupportInitialize)(this.inputHeat)).EndInit();
            ((System.ComponentModel.ISupportInitialize)(this.inputPlot)).EndInit();
            ((System.ComponentModel.ISupportInitialize)(this.inputTime)).EndInit();
            ((System.ComponentModel.ISupportInitialize)(this.inputDelta)).EndInit();
            ((System.ComponentModel.ISupportInitialize)(this.inputStartTemp)).EndInit();
            ((System.ComponentModel.ISupportInitialize)(this.inputRight)).EndInit();
            ((System.ComponentModel.ISupportInitialize)(this.inputLeft)).EndInit();
            ((System.ComponentModel.ISupportInitialize)(this.inputWidth)).EndInit();
            ((System.ComponentModel.ISupportInitialize)(this.chart1)).EndInit();
            ((System.ComponentModel.ISupportInitialize)(this.dataGridResults)).EndInit();
            this.ResumeLayout(false);

        }

        #endregion

        private System.Windows.Forms.Panel panel1;
        private System.Windows.Forms.NumericUpDown inputWidth;
        private System.Windows.Forms.Label label1;
        private System.Windows.Forms.DataVisualization.Charting.Chart chart1;
        private System.Windows.Forms.NumericUpDown inputRight;
        private System.Windows.Forms.Label label3;
        private System.Windows.Forms.NumericUpDown inputLeft;
        private System.Windows.Forms.Label label2;
        private System.Windows.Forms.Button btnStart;
        private System.Windows.Forms.NumericUpDown inputTime;
        private System.Windows.Forms.Label label6;
        private System.Windows.Forms.NumericUpDown inputDelta;
        private System.Windows.Forms.Label label5;
        private System.Windows.Forms.NumericUpDown inputStartTemp;
        private System.Windows.Forms.Label label4;
        private System.Windows.Forms.Button btnClear;
        private System.Windows.Forms.NumericUpDown inputLambda;
        private System.Windows.Forms.Label label9;
        private System.Windows.Forms.NumericUpDown inputHeat;
        private System.Windows.Forms.Label label8;
        private System.Windows.Forms.NumericUpDown inputPlot;
        private System.Windows.Forms.Label label7;
        private System.Windows.Forms.DataGridView dataGridResults;
        private System.Windows.Forms.NumericUpDown inputStep;
        private System.Windows.Forms.Label label10;
        private System.Windows.Forms.DataGridViewTextBoxColumn dtValue;
        private System.Windows.Forms.DataGridViewTextBoxColumn h;
        private System.Windows.Forms.DataGridViewTextBoxColumn Tmiddle;
        private System.Windows.Forms.DataGridViewTextBoxColumn endTime;
    }
}


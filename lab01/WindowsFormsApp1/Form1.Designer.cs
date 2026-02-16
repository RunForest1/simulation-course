namespace WindowsFormsApp1
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
            this.components = new System.ComponentModel.Container();
            System.Windows.Forms.DataVisualization.Charting.ChartArea chartArea1 = new System.Windows.Forms.DataVisualization.Charting.ChartArea();
            System.Windows.Forms.DataVisualization.Charting.Legend legend1 = new System.Windows.Forms.DataVisualization.Charting.Legend();
            this.labHeight = new System.Windows.Forms.Label();
            this.labAngle = new System.Windows.Forms.Label();
            this.labSpeed = new System.Windows.Forms.Label();
            this.panelSettings = new System.Windows.Forms.Panel();
            this.btnClear = new System.Windows.Forms.Button();
            this.inputWeight = new System.Windows.Forms.NumericUpDown();
            this.label2 = new System.Windows.Forms.Label();
            this.inputSize = new System.Windows.Forms.NumericUpDown();
            this.label1 = new System.Windows.Forms.Label();
            this.inputAccuracy = new System.Windows.Forms.NumericUpDown();
            this.labAccuracy = new System.Windows.Forms.Label();
            this.inputSpeed = new System.Windows.Forms.NumericUpDown();
            this.inputAngle = new System.Windows.Forms.NumericUpDown();
            this.inputHeight = new System.Windows.Forms.NumericUpDown();
            this.btnLaunch = new System.Windows.Forms.Button();
            this.chart = new System.Windows.Forms.DataVisualization.Charting.Chart();
            this.timer1 = new System.Windows.Forms.Timer(this.components);
            this.dataGridResults = new System.Windows.Forms.DataGridView();
            this.colDt = new System.Windows.Forms.DataGridViewTextBoxColumn();
            this.colRange = new System.Windows.Forms.DataGridViewTextBoxColumn();
            this.colHeight = new System.Windows.Forms.DataGridViewTextBoxColumn();
            this.colSpeed = new System.Windows.Forms.DataGridViewTextBoxColumn();
            this.panelSettings.SuspendLayout();
            ((System.ComponentModel.ISupportInitialize)(this.inputWeight)).BeginInit();
            ((System.ComponentModel.ISupportInitialize)(this.inputSize)).BeginInit();
            ((System.ComponentModel.ISupportInitialize)(this.inputAccuracy)).BeginInit();
            ((System.ComponentModel.ISupportInitialize)(this.inputSpeed)).BeginInit();
            ((System.ComponentModel.ISupportInitialize)(this.inputAngle)).BeginInit();
            ((System.ComponentModel.ISupportInitialize)(this.inputHeight)).BeginInit();
            ((System.ComponentModel.ISupportInitialize)(this.chart)).BeginInit();
            ((System.ComponentModel.ISupportInitialize)(this.dataGridResults)).BeginInit();
            this.SuspendLayout();
            // 
            // labHeight
            // 
            this.labHeight.AutoSize = true;
            this.labHeight.Location = new System.Drawing.Point(22, 14);
            this.labHeight.Name = "labHeight";
            this.labHeight.Size = new System.Drawing.Size(48, 13);
            this.labHeight.TabIndex = 0;
            this.labHeight.Text = "Высота:";
            // 
            // labAngle
            // 
            this.labAngle.AutoSize = true;
            this.labAngle.Location = new System.Drawing.Point(22, 36);
            this.labAngle.Name = "labAngle";
            this.labAngle.Size = new System.Drawing.Size(35, 13);
            this.labAngle.TabIndex = 1;
            this.labAngle.Text = "Угол:";
            // 
            // labSpeed
            // 
            this.labSpeed.AutoSize = true;
            this.labSpeed.Location = new System.Drawing.Point(22, 60);
            this.labSpeed.Name = "labSpeed";
            this.labSpeed.Size = new System.Drawing.Size(58, 13);
            this.labSpeed.TabIndex = 2;
            this.labSpeed.Text = "Скорость:";
            // 
            // panelSettings
            // 
            this.panelSettings.BackColor = System.Drawing.SystemColors.ControlLight;
            this.panelSettings.Controls.Add(this.btnClear);
            this.panelSettings.Controls.Add(this.inputWeight);
            this.panelSettings.Controls.Add(this.label2);
            this.panelSettings.Controls.Add(this.inputSize);
            this.panelSettings.Controls.Add(this.label1);
            this.panelSettings.Controls.Add(this.inputAccuracy);
            this.panelSettings.Controls.Add(this.labAccuracy);
            this.panelSettings.Controls.Add(this.inputSpeed);
            this.panelSettings.Controls.Add(this.inputAngle);
            this.panelSettings.Controls.Add(this.inputHeight);
            this.panelSettings.Controls.Add(this.btnLaunch);
            this.panelSettings.Controls.Add(this.labSpeed);
            this.panelSettings.Controls.Add(this.labHeight);
            this.panelSettings.Controls.Add(this.labAngle);
            this.panelSettings.Location = new System.Drawing.Point(12, 12);
            this.panelSettings.Name = "panelSettings";
            this.panelSettings.Size = new System.Drawing.Size(507, 95);
            this.panelSettings.TabIndex = 3;
            // 
            // btnClear
            // 
            this.btnClear.BackColor = System.Drawing.SystemColors.HighlightText;
            this.btnClear.Cursor = System.Windows.Forms.Cursors.Hand;
            this.btnClear.Location = new System.Drawing.Point(412, 3);
            this.btnClear.Name = "btnClear";
            this.btnClear.Size = new System.Drawing.Size(75, 46);
            this.btnClear.TabIndex = 14;
            this.btnClear.Text = "Очистить графики";
            this.btnClear.UseVisualStyleBackColor = false;
            this.btnClear.Click += new System.EventHandler(this.btnClear_Click);
            // 
            // inputWeight
            // 
            this.inputWeight.DecimalPlaces = 1;
            this.inputWeight.Increment = new decimal(new int[] {
            1,
            0,
            0,
            65536});
            this.inputWeight.Location = new System.Drawing.Point(286, 58);
            this.inputWeight.Minimum = new decimal(new int[] {
            1,
            0,
            0,
            131072});
            this.inputWeight.Name = "inputWeight";
            this.inputWeight.Size = new System.Drawing.Size(120, 20);
            this.inputWeight.TabIndex = 13;
            this.inputWeight.Value = new decimal(new int[] {
            5,
            0,
            0,
            65536});
            // 
            // label2
            // 
            this.label2.AutoSize = true;
            this.label2.Location = new System.Drawing.Point(225, 60);
            this.label2.Name = "label2";
            this.label2.Size = new System.Drawing.Size(55, 13);
            this.label2.TabIndex = 12;
            this.label2.Text = "Вес тела:";
            // 
            // inputSize
            // 
            this.inputSize.DecimalPlaces = 2;
            this.inputSize.Increment = new decimal(new int[] {
            1,
            0,
            0,
            65536});
            this.inputSize.Location = new System.Drawing.Point(286, 34);
            this.inputSize.Minimum = new decimal(new int[] {
            1,
            0,
            0,
            65536});
            this.inputSize.Name = "inputSize";
            this.inputSize.Size = new System.Drawing.Size(120, 20);
            this.inputSize.TabIndex = 11;
            this.inputSize.Value = new decimal(new int[] {
            1,
            0,
            0,
            65536});
            // 
            // label1
            // 
            this.label1.AutoSize = true;
            this.label1.Location = new System.Drawing.Point(225, 36);
            this.label1.Name = "label1";
            this.label1.Size = new System.Drawing.Size(49, 13);
            this.label1.TabIndex = 10;
            this.label1.Text = "Размер:";
            // 
            // inputAccuracy
            // 
            this.inputAccuracy.DecimalPlaces = 4;
            this.inputAccuracy.Increment = new decimal(new int[] {
            1,
            0,
            0,
            262144});
            this.inputAccuracy.Location = new System.Drawing.Point(286, 12);
            this.inputAccuracy.Maximum = new decimal(new int[] {
            1,
            0,
            0,
            0});
            this.inputAccuracy.Minimum = new decimal(new int[] {
            1,
            0,
            0,
            262144});
            this.inputAccuracy.Name = "inputAccuracy";
            this.inputAccuracy.Size = new System.Drawing.Size(120, 20);
            this.inputAccuracy.TabIndex = 9;
            this.inputAccuracy.Value = new decimal(new int[] {
            1,
            0,
            0,
            0});
            // 
            // labAccuracy
            // 
            this.labAccuracy.AutoSize = true;
            this.labAccuracy.Location = new System.Drawing.Point(225, 14);
            this.labAccuracy.Name = "labAccuracy";
            this.labAccuracy.Size = new System.Drawing.Size(57, 13);
            this.labAccuracy.TabIndex = 8;
            this.labAccuracy.Text = "Точность:";
            // 
            // inputSpeed
            // 
            this.inputSpeed.Location = new System.Drawing.Point(89, 58);
            this.inputSpeed.Name = "inputSpeed";
            this.inputSpeed.Size = new System.Drawing.Size(120, 20);
            this.inputSpeed.TabIndex = 7;
            this.inputSpeed.Value = new decimal(new int[] {
            10,
            0,
            0,
            0});
            // 
            // inputAngle
            // 
            this.inputAngle.Location = new System.Drawing.Point(89, 34);
            this.inputAngle.Name = "inputAngle";
            this.inputAngle.Size = new System.Drawing.Size(120, 20);
            this.inputAngle.TabIndex = 6;
            this.inputAngle.Value = new decimal(new int[] {
            45,
            0,
            0,
            0});
            // 
            // inputHeight
            // 
            this.inputHeight.Location = new System.Drawing.Point(89, 12);
            this.inputHeight.Name = "inputHeight";
            this.inputHeight.Size = new System.Drawing.Size(120, 20);
            this.inputHeight.TabIndex = 5;
            // 
            // btnLaunch
            // 
            this.btnLaunch.BackColor = System.Drawing.SystemColors.HighlightText;
            this.btnLaunch.Cursor = System.Windows.Forms.Cursors.Hand;
            this.btnLaunch.Location = new System.Drawing.Point(412, 52);
            this.btnLaunch.Name = "btnLaunch";
            this.btnLaunch.Size = new System.Drawing.Size(75, 40);
            this.btnLaunch.TabIndex = 3;
            this.btnLaunch.Text = "Запуск";
            this.btnLaunch.UseVisualStyleBackColor = false;
            this.btnLaunch.Click += new System.EventHandler(this.btnLaunch_Click);
            // 
            // chart
            // 
            this.chart.BackgroundImageLayout = System.Windows.Forms.ImageLayout.None;
            chartArea1.AxisX.Maximum = 20D;
            chartArea1.AxisX.Minimum = 0D;
            chartArea1.AxisY.Maximum = 10D;
            chartArea1.AxisY.Minimum = 0D;
            chartArea1.Name = "ChartArea1";
            this.chart.ChartAreas.Add(chartArea1);
            legend1.Name = "Legend1";
            this.chart.Legends.Add(legend1);
            this.chart.Location = new System.Drawing.Point(12, 113);
            this.chart.Name = "chart";
            this.chart.Palette = System.Windows.Forms.DataVisualization.Charting.ChartColorPalette.Bright;
            this.chart.Size = new System.Drawing.Size(837, 287);
            this.chart.TabIndex = 4;
            this.chart.Text = "chart";
            this.chart.UseWaitCursor = true;
            // 
            // timer1
            // 
            this.timer1.Tick += new System.EventHandler(this.timer1_Tick);
            // 
            // dataGridResults
            // 
            this.dataGridResults.AutoSizeColumnsMode = System.Windows.Forms.DataGridViewAutoSizeColumnsMode.Fill;
            this.dataGridResults.BackgroundColor = System.Drawing.SystemColors.ControlLight;
            this.dataGridResults.ColumnHeadersHeightSizeMode = System.Windows.Forms.DataGridViewColumnHeadersHeightSizeMode.AutoSize;
            this.dataGridResults.Columns.AddRange(new System.Windows.Forms.DataGridViewColumn[] {
            this.colDt,
            this.colRange,
            this.colHeight,
            this.colSpeed});
            this.dataGridResults.Location = new System.Drawing.Point(525, 12);
            this.dataGridResults.Name = "dataGridResults";
            this.dataGridResults.RowHeadersVisible = false;
            this.dataGridResults.Size = new System.Drawing.Size(324, 95);
            this.dataGridResults.TabIndex = 5;
            // 
            // colDt
            // 
            this.colDt.HeaderText = "Шаг, с";
            this.colDt.Name = "colDt";
            this.colDt.ReadOnly = true;
            // 
            // colRange
            // 
            this.colRange.HeaderText = "Дальность, м";
            this.colRange.Name = "colRange";
            this.colRange.ReadOnly = true;
            // 
            // colHeight
            // 
            this.colHeight.HeaderText = "Макс. высота, м";
            this.colHeight.Name = "colHeight";
            this.colHeight.ReadOnly = true;
            // 
            // colSpeed
            // 
            this.colSpeed.HeaderText = "Скорость в конечной точке м/c";
            this.colSpeed.Name = "colSpeed";
            this.colSpeed.ReadOnly = true;
            // 
            // Form1
            // 
            this.AutoScaleDimensions = new System.Drawing.SizeF(6F, 13F);
            this.AutoScaleMode = System.Windows.Forms.AutoScaleMode.Font;
            this.ClientSize = new System.Drawing.Size(927, 402);
            this.Controls.Add(this.dataGridResults);
            this.Controls.Add(this.chart);
            this.Controls.Add(this.panelSettings);
            this.Name = "Form1";
            this.Text = "Form1";
            this.panelSettings.ResumeLayout(false);
            this.panelSettings.PerformLayout();
            ((System.ComponentModel.ISupportInitialize)(this.inputWeight)).EndInit();
            ((System.ComponentModel.ISupportInitialize)(this.inputSize)).EndInit();
            ((System.ComponentModel.ISupportInitialize)(this.inputAccuracy)).EndInit();
            ((System.ComponentModel.ISupportInitialize)(this.inputSpeed)).EndInit();
            ((System.ComponentModel.ISupportInitialize)(this.inputAngle)).EndInit();
            ((System.ComponentModel.ISupportInitialize)(this.inputHeight)).EndInit();
            ((System.ComponentModel.ISupportInitialize)(this.chart)).EndInit();
            ((System.ComponentModel.ISupportInitialize)(this.dataGridResults)).EndInit();
            this.ResumeLayout(false);

        }

        #endregion

        private System.Windows.Forms.Label labHeight;
        private System.Windows.Forms.Label labAngle;
        private System.Windows.Forms.Label labSpeed;
        private System.Windows.Forms.Panel panelSettings;
        private System.Windows.Forms.Button btnLaunch;
        private System.Windows.Forms.NumericUpDown inputSpeed;
        private System.Windows.Forms.NumericUpDown inputAngle;
        private System.Windows.Forms.NumericUpDown inputHeight;
        private System.Windows.Forms.DataVisualization.Charting.Chart chart;
        private System.Windows.Forms.Timer timer1;
        private System.Windows.Forms.NumericUpDown inputAccuracy;
        private System.Windows.Forms.Label labAccuracy;
        private System.Windows.Forms.DataGridView dataGridResults;
        private System.Windows.Forms.DataGridViewTextBoxColumn colDt;
        private System.Windows.Forms.DataGridViewTextBoxColumn colRange;
        private System.Windows.Forms.DataGridViewTextBoxColumn colHeight;
        private System.Windows.Forms.DataGridViewTextBoxColumn colSpeed;
        private System.Windows.Forms.Label label2;
        private System.Windows.Forms.NumericUpDown inputSize;
        private System.Windows.Forms.Label label1;
        private System.Windows.Forms.NumericUpDown inputWeight;
        private System.Windows.Forms.Button btnClear;
    }
}


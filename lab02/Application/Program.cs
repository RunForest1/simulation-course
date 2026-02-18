using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.Windows.Forms;
using WinApp = System.Windows.Forms.Application;

namespace Lab2
{
    internal static class Program
    {
        /// <summary>
        /// Главная точка входа для приложения.
        /// </summary>
        [STAThread]
        static void Main()
        {

            WinApp.EnableVisualStyles();
            WinApp.SetCompatibleTextRenderingDefault(false);
            WinApp.Run(new Form1());
        }
    }
}

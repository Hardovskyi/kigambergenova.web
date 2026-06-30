Place the two PDFs in THIS folder with these exact names:

  Resume_Kamila_Igambergenova.pdf
  Portfolio_Kamila_Igambergenova.pdf

The website (index.html, work.html, contact.html) already links to them at:
  assets/Resume_Kamila_Igambergenova.pdf
  assets/Portfolio_Kamila_Igambergenova.pdf

Quick copy (run in PowerShell):

  Copy-Item "$env:USERPROFILE\OneDrive\Рабочий стол\Resume_Kamila_Igambergenova.pdf" "$env:USERPROFILE\Downloads\kamilawebsite\assets\" -Force
  Copy-Item "$env:USERPROFILE\OneDrive\Рабочий стол\Portfolio_Kamila_Igambergenova.pdf" "$env:USERPROFILE\Downloads\kamilawebsite\assets\" -Force

You can delete this README.txt afterwards.

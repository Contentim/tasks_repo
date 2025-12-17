---
tags:
  - git
  - решения
команды:
---
git   
 init  
 status  
 add <название файла | название каталога>  
 add -A | add *  
 restore --staged <название файла | название каталога>  
 commit -m "<текст сообщения>"  
 commit -a -m "<текст сообщения>"  
 log  
 log --oneline  
 log --graph  
 log -10  
 branch <название ветки>  
 branch -a  
 switch <название ветки>  
 switch -c <название ветки>  
 branch -d <название ветки>  
 merge <название ветки с какой необходимо объединить>  
 merge --continue  
 merge --abort  
 reset --hard @~<количество коммитов на сколько необходимо откатить>  
 reset --hard <хеш коммита>  
 reset --soft @~<количество коммитов на сколько необходимо откатить>  
 reset --soft <хеш коммита>  
 rebase <хеш коммита>  
 rebase - i <хеш коммита>  
 rebase --into <куда> <откуда>  
 tag <название тега>  
 tag <название тега> -m "<Сообщение>"  
 tag --list  
 tag -n  
 tag -d <название тега>  
 clone <путь к репозиторию> <название папки>  
 remote add origin <путь к репозиторию>  
 push -u origin main  
 push origin --all  
 push origin tag <название тега>  
 stash -m <сообщение>  
 stash list  
 stash pop <название стеша>  
 fetch   
 pull